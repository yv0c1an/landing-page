import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SafeBrowsingCheck } from '@/utils/SafeBrowsingCheck';

interface PlatformResponse {
  code: string;
  msg: string | null;
  data: {
    platform_name: string;
  };
}

async function checkUrlAvailability(url: string): Promise<boolean> {
  try {
    const response = await axios.get<PlatformResponse>(
      `${url}/wap/api/syspara!getSyspara.action`,
      {
        params: {
          code: 'platform_name',
          lang: 'en'
        },
        timeout: 5000 // 5秒超时
      }
    );
    
    return response.data.code === '0';
  } catch (error) {
    console.error('Error checking URL availability:', error);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 获取 URL 列表
    const response = await axios.get(process.env.NEXT_PUBLIC_URL_LIST_ENDPOINT as string);
    const text = response.data;
    
    // 处理域名列表
    const urls = text.split('\n')
      .filter((domain: string) => domain.trim())
      .map((domain: string) => `https://${domain.trim()}`);
    
    // 随机打乱顺序
    const shuffledUrls = [...urls].sort(() => Math.random() - 0.5);

    // 尝试找到一个可用且安全的 URL
    for (const url of shuffledUrls) {
      // 首先检查 URL 是否安全
      const isSafe = await SafeBrowsingCheck.checkUrl(url);
      if (!isSafe) continue;

      // 然后检查 URL 是否可用
      const isAvailable = await checkUrlAvailability(url);
      if (!isAvailable) continue;

      // 如果 URL 既安全又可用，返回它
      return res.status(200).json({ url });
    }

    // 如果没有找到可用的 URL，返回 404
    return res.status(404).json({ message: 'No available and safe URL found' });
  } catch (error) {
    console.error('Error processing URLs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}