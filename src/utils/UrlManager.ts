import axios from 'axios';

export class UrlManager {
  private static currentUrl: string | null = null;

  static async getRandomSafeUrl(): Promise<string | null> {
    try {
      // 如果已经有一个当前使用的 URL，直接返回
      if (this.currentUrl) {
        return this.currentUrl;
      }

      // 从 API 获取安全的 URL
      
      const response = await axios.get('/api/urls');
      const url = response.data.url;

      if (url) {
        this.currentUrl = url;
        return url;
      }

      return null;
    } catch (error) {
      console.error('Error getting safe URL:', error);
      return null;
    }
  }

  static resetCurrentUrl(): void {
    this.currentUrl = null;
  }
}