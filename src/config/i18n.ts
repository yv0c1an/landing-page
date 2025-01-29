export const locales = ['en', 'zh', 'ja', 'ko', 'th'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number]; 