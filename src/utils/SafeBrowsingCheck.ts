import axios from 'axios';

export class SafeBrowsingCheck {
  private static readonly API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY; // 注意：使用服务端环境变量，而非客户端环境变量
  private static readonly API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

  static async checkUrl(url: string): Promise<boolean> {
    try {
      if (!this.API_KEY) {
        // 在生产环境中不应该暴露敏感信息
        if (process.env.NODE_ENV !== 'production') {
        console.error('Google Safe Browsing API key is not set');
        }
        return true; // 如果没有 API key，默认返回安全
      }

      const curl = `${this.API_URL}?key=${this.API_KEY}`;
      const response = await axios.post(curl,
        {
          client: {
            clientId: "url-check-tool",
            clientVersion: "1.0.0"
          },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
          }
        }
      );

      // 如果没有匹配到威胁，response.data 将是空对象
      return Object.keys(response.data).length === 0;
    } catch (error) {
      // 在生产环境中使用更安全的错误日志
      if (process.env.NODE_ENV !== 'production') {
      console.error('Error checking URL safety:', error);
      } else {
        console.error('Error checking URL safety');
      }
      return true; // 如果检查失败，默认返回安全
    }
  }
}