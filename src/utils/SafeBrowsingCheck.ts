import axios from 'axios';

export class SafeBrowsingCheck {
  private static readonly API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  private static readonly API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

  static async checkUrl(url: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${this.API_URL}?key=${this.API_KEY}`,
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

      // console.log('res:' , response.data)
      // 如果没有匹配到威胁，response.data 将是空对象
      return Object.keys(response.data).length === 0;
    } catch (error) {
      console.error('Error checking URL safety:', error);
      return false;
    }
  }
} 