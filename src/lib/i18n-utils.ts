import { Locale, languageConfig } from '@/config/i18n';
import { getEnabledLanguages } from '@/lib/env-config';

/**
 * 多语言工具类
 */
export class I18nUtils {
  /**
   * 获取语言的本地化名称
   */
  static getLocalizedName(locale: Locale): string {
    return (languageConfig as any)[locale]?.nativeName || locale;
  }

  /**
   * 获取语言的英文名称
   */
  static getEnglishName(locale: Locale): string {
    return (languageConfig as any)[locale]?.name || locale;
  }

  /**
   * 获取语言的国旗表情符号
   */
  static getFlag(locale: Locale): string {
    return (languageConfig as any)[locale]?.flag || '🌐';
  }

  /**
   * 获取语言的货币代码
   */
  static getCurrency(locale: Locale): string {
    return (languageConfig as any)[locale]?.currency || 'USD';
  }

  /**
   * 获取语言的时区
   */
  static getTimeZone(locale: Locale): string {
    return (languageConfig as any)[locale]?.timeZone || 'UTC';
  }

  /**
   * 获取语言的日期格式
   */
  static getDateFormat(locale: Locale): string {
    return (languageConfig as any)[locale]?.dateFormat || 'MM/DD/YYYY';
  }

  /**
   * 检查是否为支持的语言
   */
  static isSupportedLocale(locale: string): boolean {
    const enabledLocales = getEnabledLanguages();
    return enabledLocales.includes(locale);
  }

  /**
   * 获取所有支持的语言信息
   */
  static getAllLanguages() {
    const enabledLocales = getEnabledLanguages();
    return enabledLocales.map((locale: string) => ({
      code: locale,
      name: this.getEnglishName(locale),
      nativeName: this.getLocalizedName(locale),
      flag: this.getFlag(locale),
      currency: this.getCurrency(locale),
      timeZone: this.getTimeZone(locale),
      dateFormat: this.getDateFormat(locale)
    }));
  }

  /**
   * 格式化货币
   */
  static formatCurrency(amount: number, locale: Locale): string {
    const currency = this.getCurrency(locale);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * 格式化日期
   */
  static formatDate(date: Date, locale: Locale): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: this.getTimeZone(locale)
    }).format(date);
  }

  /**
   * 获取语言的文本方向
   */
  static getTextDirection(locale: Locale): 'ltr' | 'rtl' {
    return (languageConfig as any)[locale]?.direction || 'ltr';
  }

  /**
   * 生成语言切换器数据
   */
  static getLanguageSwitcherData(currentLocale: Locale) {
    const enabledLocales = getEnabledLanguages();
    return enabledLocales.map((locale: string) => ({
      code: locale,
      name: this.getLocalizedName(locale),
      flag: this.getFlag(locale),
      isActive: locale === currentLocale,
      href: `/${locale}`
    }));
  }
}

/**
 * 语言新增助手类
 * 用于简化新语言的添加过程
 */
export class LanguageAdditionHelper {
  /**
   * 生成新语言配置模板
   */
  static generateLanguageConfig(
    locale: string,
    englishName: string,
    nativeName: string,
    flag: string,
    currency: string = 'USD',
    timeZone: string = 'UTC',
    dateFormat: string = 'MM/DD/YYYY'
  ) {
    return {
      [locale]: {
        name: englishName,
        nativeName: nativeName,
        flag: flag,
        direction: 'ltr',
        currency: currency,
        dateFormat: dateFormat,
        timeZone: timeZone
      }
    };
  }

  /**
   * 生成语言文件模板
   */
  static generateLanguageFileTemplate(): string {
    return `export default {
  common: {
    login: "",
    register: "",
    sellerCenter: "",
    goShopping: "",
    contactUs: "",
    promote: "",
    redirectTitle: "",
    redirecting: "",
    codeOfConduct: "",
    about: "",
    privacy: "",
    terms: "",
    allRightsReserved: "",
  },
  cookies: {
    message: "",
    accept: "",
    decline: "",
  },
  nav: {
    selectLanguage: "",
    languages: {
      zh: "简体中文",
      en: "English",
      ja: "日本語",
      ko: "한국어",
      th: "ไทย"
    },
  },
  // ... 其他翻译项
};`;
  }

  /**
   * 验证语言配置完整性
   */
  static validateLanguageConfig(locale: Locale, messages: any): { isValid: boolean; missingKeys: string[] } {
    const requiredKeys = [
      'common.login',
      'common.register',
      'nav.selectLanguage',
      'hero.registerTitle',
      'features.title'
    ];

    const missingKeys: string[] = [];

    requiredKeys.forEach(key => {
      const keys = key.split('.');
      let current = messages;
      
      for (const k of keys) {
        if (!current || !current[k]) {
          missingKeys.push(key);
          break;
        }
        current = current[k];
      }
    });

    return {
      isValid: missingKeys.length === 0,
      missingKeys
    };
  }

  /**
   * 生成添加新语言的步骤指南
   */
  static getAddLanguageSteps(newLocale: string): string[] {
    return [
      `1. 在 src/config/i18n.ts 中将 '${newLocale}' 添加到 locales 数组`,
      `2. 在 languageConfig 中添加 ${newLocale} 的配置信息`,
      `3. 在 languageDetectionMap 中添加 ${newLocale} 的检测模式`,
      `4. 创建 src/locales/${newLocale}.ts 文件并添加所有翻译`,
      `5. 在 src/lib/i18n-loader.ts 中添加动态导入配置`,
      `6. 更新所有现有语言文件中的 nav.languages 部分`,
      `7. 测试新语言的功能是否正常`
    ];
  }
} 