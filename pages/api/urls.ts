import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SafeBrowsingCheck } from '@/utils/SafeBrowsingCheck';

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

    // 找到第一个安全的 URL
    for (const url of shuffledUrls) {
      const isSafe = await SafeBrowsingCheck.checkUrl(url);
      if (isSafe) {
        return res.status(200).json({ url });
      }
    }

    // 如果没有找到安全的 URL，返回默认值
    return res.status(404).json({ message: 'No safe URL found' });
  } catch (error) {
    console.error('Error processing URLs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 