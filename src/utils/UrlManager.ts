import axios from 'axios';
import { SafeBrowsingCheck } from './SafeBrowsingCheck';

export class UrlManager {
  private static urls: string[] = [];
  private static readonly URL_LIST_ENDPOINT = process.env.NEXT_PUBLIC_URL_LIST_ENDPOINT;

  static async loadUrls(): Promise<void> {
    try {
      // @ts-ignore
      const response = await axios.get(this.URL_LIST_ENDPOINT);
      const text = response.data;
      // 为域名添加 https:// 前缀
      this.urls = text.split('\n')
        .filter((domain: string) => domain.trim())
        .map((domain: string) => `https://${domain.trim()}`);
    } catch (error) {
      console.error('Error loading URLs:', error);
      this.urls = [];
    }
  }

  static async getRandomSafeUrl(): Promise<string | null> {
    try {
      const response = await axios.get('/api/urls');
      return response.data.url;
    } catch (error) {
      console.error('Error getting safe URL:', error);
      return null;
    }
  }
} 