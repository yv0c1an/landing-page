export const locales = ['zh', 'en', 'ja', 'th', 'ko'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number]; 