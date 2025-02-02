import axios from 'axios';

export class SafeBrowsingCheck {
  private static readonly API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SAFE_BROWSING_API_KEY;
  private static readonly API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

  static async checkUrl(url: string): Promise<boolean> {
    try {
      if (!this.API_KEY) {
        console.error('Google Safe Browsing API key is not set');
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
      console.error('Error checking URL safety:', error);
      return true; // 如果检查失败，默认返回安全
    }
  }
}