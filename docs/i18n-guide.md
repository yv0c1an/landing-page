# 多语言系统使用指南

## 概述

本项目已配置了优化的多语言系统，支持以下语言：
- 🇺🇸 English (en)
- 🇨🇳 简体中文 (zh)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)
- 🇹🇭 ไทย (th)

## 系统架构

### 核心文件结构
```
src/
├── config/
│   └── i18n.ts                 # 多语言配置
├── lib/
│   ├── i18n-loader.ts          # 语言文件加载器
│   └── i18n-utils.ts           # 多语言工具类
├── locales/
│   ├── en.ts                   # 英文翻译
│   ├── zh.ts                   # 中文翻译
│   ├── ja.ts                   # 日文翻译
│   ├── ko.ts                   # 韩文翻译
│   └── th.ts                   # 泰文翻译
i18n/
└── request.ts                  # Next.js 国际化请求配置
middleware.ts                   # 语言路由中间件
```

## 主要功能

### 1. 智能语言检测
- 自动检测用户浏览器语言偏好
- 支持多种语言变体（如 zh-CN, zh-TW, en-US, en-GB 等）
- 智能回退到默认语言

### 2. 高性能加载
- 动态语言文件加载
- 内存缓存机制
- 错误处理和回退机制

### 3. 丰富的语言配置
每种语言包含以下配置：
- 本地化名称
- 货币代码
- 时区设置
- 日期格式
- 文本方向

### 4. 实用工具类
提供多种实用函数：
- 货币格式化
- 日期格式化
- 语言切换器数据生成
- 语言验证

## 使用方法

### 在组件中使用翻译
```tsx
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('common');
  
  return (
    <div>
      <h1>{t('login')}</h1>
      <button>{t('register')}</button>
    </div>
  );
}
```

### 使用工具类
```tsx
import { I18nUtils } from '@/lib/i18n-utils';

// 获取语言信息
const languageName = I18nUtils.getLocalizedName('ja'); // "日本語"
const flag = I18nUtils.getFlag('ko'); // "🇰🇷"

// 格式化货币
const price = I18nUtils.formatCurrency(1000, 'ja'); // "¥1,000"

// 格式化日期
const date = I18nUtils.formatDate(new Date(), 'th'); // 泰语格式日期

// 获取语言切换器数据
const switcherData = I18nUtils.getLanguageSwitcherData('en');
```

## 添加新语言

### 方法一：使用助手类（推荐）
```tsx
import { LanguageAdditionHelper } from '@/lib/i18n-utils';

// 1. 生成语言配置
const newConfig = LanguageAdditionHelper.generateLanguageConfig(
  'fr',           // 语言代码
  'French',       // 英文名称
  'Français',     // 本地化名称
  '🇫🇷',          // 国旗
  'EUR',          // 货币
  'Europe/Paris', // 时区
  'DD/MM/YYYY'    // 日期格式
);

// 2. 获取步骤指南
const steps = LanguageAdditionHelper.getAddLanguageSteps('fr');
console.log(steps);

// 3. 生成语言文件模板
const template = LanguageAdditionHelper.generateLanguageFileTemplate();
```

### 方法二：手动添加
1. **更新配置文件** (`src/config/i18n.ts`)
```ts
export const locales = ['en', 'zh', 'ja', 'ko', 'th', 'fr'] as const;

export const languageConfig = {
  // ... 现有配置
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeZone: 'Europe/Paris'
  }
};

export const languageDetectionMap = {
  // ... 现有映射
  'fr': ['fr', 'fr-FR', 'fr-CA']
};
```

2. **更新加载器** (`src/lib/i18n-loader.ts`)
```ts
const localeModules = {
  // ... 现有模块
  fr: () => import('@/locales/fr'),
};
```

3. **创建语言文件** (`src/locales/fr.ts`)
```ts
export default {
  common: {
    login: "Connexion",
    register: "S'inscrire",
    // ... 其他翻译
  },
  // ... 完整翻译结构
};
```

4. **更新所有语言文件的语言选择器**
在每个语言文件的 `nav.languages` 部分添加新语言：
```ts
languages: {
  zh: "简体中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
  fr: "Français"  // 新增
}
```

## 最佳实践

### 1. 翻译键命名规范
```ts
// ✅ 推荐：使用描述性的嵌套结构
{
  hero: {
    title: "标题",
    subtitle: "副标题"
  },
  buttons: {
    submit: "提交",
    cancel: "取消"
  }
}

// ❌ 避免：平铺的长键名
{
  "heroTitle": "标题",
  "heroSubtitle": "副标题",
  "buttonSubmit": "提交"
}
```

### 2. 处理复数和变量
```ts
// 支持变量插值
{
  welcome: "欢迎 {username}！",
  itemCount: "共 {count} 个项目"
}

// 使用时
t('welcome', { username: 'John' })
t('itemCount', { count: 5 })
```

### 3. 语言文件维护
- 保持所有语言文件的结构一致
- 定期检查翻译完整性
- 使用 TypeScript 确保类型安全

### 4. 性能优化
- 语言文件会自动缓存，无需担心重复加载
- 大型应用可以考虑按页面拆分翻译文件
- 使用 `preloadMessages()` 预加载常用语言

## 故障排除

### 常见问题

1. **翻译不显示**
   - 检查翻译键是否存在
   - 确认语言文件是否正确导出
   - 查看浏览器控制台错误信息

2. **语言切换不生效**
   - 确认路由配置正确
   - 检查中间件是否正常工作
   - 验证语言代码是否在支持列表中

3. **新语言不显示**
   - 确认已在所有必要文件中添加配置
   - 重启开发服务器
   - 清除浏览器缓存

### 调试工具
```tsx
import { getCacheStatus } from '@/lib/i18n-loader';
import { LanguageAdditionHelper } from '@/lib/i18n-utils';

// 检查缓存状态
console.log(getCacheStatus());

// 验证翻译完整性
const validation = LanguageAdditionHelper.validateLanguageConfig('ja', messages);
if (!validation.isValid) {
  console.warn('缺少翻译键:', validation.missingKeys);
}
```

## 部署注意事项

1. **静态导出**
   - 确保所有语言路由都被正确生成
   - 检查静态文件是否包含所有语言版本

2. **CDN 配置**
   - 配置适当的缓存策略
   - 确保语言文件能被正确缓存

3. **SEO 优化**
   - 添加适当的 hreflang 标签
   - 确保搜索引擎能正确索引各语言版本

## 技术支持

如果在使用过程中遇到问题，可以：
1. 查看浏览器控制台错误信息
2. 使用提供的调试工具
3. 参考工具类中的验证方法
4. 检查 Next.js 和 next-intl 官方文档

---

**注意**：本系统基于 Next.js 13+ 的 App Router 和 next-intl 库构建，确保项目依赖版本兼容。 