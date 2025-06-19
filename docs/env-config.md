# 环境变量配置说明

## 多语言配置

在项目根目录创建以下环境变量文件：

### .env.local (本地开发)
```bash
# 多语言配置 - 本地开发环境
OPEN_LANGS=en,zh,ja,ko,th

# 其他环境变量
NEXT_PUBLIC_APP_NAME=Landing Page
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_TITLE=Landing Page
NEXT_PUBLIC_DESCRIPTION=Global Cross-border E-commerce Platform
```

### .env.production (生产环境)
```bash
# 多语言配置 - 生产环境
OPEN_LANGS=en,zh,ja,ko,th

# 其他生产环境变量
NEXT_PUBLIC_APP_NAME=Landing Page
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_TITLE=Landing Page
NEXT_PUBLIC_DESCRIPTION=Global Cross-border E-commerce Platform
```

## 支持的语言代码

| 语言代码 | 语言名称 | 国旗文件 |
|---------|---------|---------|
| en | English | en.svg |
| zh | 简体中文 | zh.svg |
| ja | 日本語 | ja.svg |
| ko | 한국어 | ko.svg |
| th | ไทย | th.svg |
| fr | Français | fr.svg |
| de | Deutsch | de.svg |
| es | Español | es.svg |
| it | Italiano | it.svg |
| ru | Русский | ru.svg |
| pt | Português | pt.svg |
| br | Português (Brasil) | br.svg |
| ca | English (Canada) | ca.svg |
| au | English (Australia) | au.svg |
| in | हिन्दी | in.svg |
| mx | Español (México) | mx.svg |
| gb | English (UK) | gb.svg |
| nl | Nederlands | nl.svg |

## 使用方法

1. 复制对应的环境变量配置到你的 `.env.local` 或 `.env.production` 文件
2. 修改 `OPEN_LANGS` 的值，只包含你想要启用的语言
3. 重启开发服务器
4. 语言切换器将只显示配置的语言

## 示例

```bash
# 只启用中英文
OPEN_LANGS=en,zh

# 启用中英日韩泰五种语言
OPEN_LANGS=en,zh,ja,ko,th

# 启用所有主要语言
OPEN_LANGS=en,zh,ja,ko,th,fr,de,es,it,ru

# 启用所有支持的语言
OPEN_LANGS=en,zh,ja,ko,th,fr,de,es,it,ru,pt,br,ca,au,in,mx,gb,nl
```

## 技术实现

### 环境变量读取流程

1. **服务端**: 直接读取 `process.env.OPEN_LANGS`
2. **客户端**: 从 `<meta name="enabled-locales">` 标签读取
3. **回退机制**: 如果未配置，默认启用 `en,zh,ja,ko,th`

### 关键文件

- `src/lib/env-config.ts` - 环境变量配置管理
- `pages/_document.tsx` - 将服务端配置传递到客户端
- `src/config/i18n.ts` - 多语言配置
- `middleware.ts` - 路由中间件
- `i18n/request.ts` - next-intl 配置

### 测试配置

运行测试脚本验证配置:
```bash
# 基础配置测试
node scripts/test-i18n-config.js

# 回退机制测试
node scripts/test-fallback.js

# 路由配置测试
node scripts/test-route-config.js
```

### 注意事项

1. **重启服务器**: 修改环境变量后需要重启开发服务器
2. **默认语言**: 英语 (en) 会自动包含，无需在 OPEN_LANGS 中明确指定
3. **无效语言**: 无效的语言代码会被自动过滤
4. **空配置**: 如果 OPEN_LANGS 为空，将使用默认配置
5. **自动回退**: 如果语言文件不存在或配置无效，会自动回退到英语
6. **路由重定向**: 访问无效语言路由时会自动重定向到英语版本

## 常见问题

### Q: 为什么修改了 OPEN_LANGS 但界面没有变化?
A: 请确保重启了开发服务器，环境变量只在服务器启动时读取。

### Q: 可以动态切换语言配置吗?
A: 不可以，语言配置在构建时确定，运行时不能更改。

### Q: 如何添加新的语言?
A: 
1. 在 `src/config/i18n.ts` 中添加语言配置
2. 创建对应的语言文件 `src/locales/[lang].ts`
3. 添加对应的国旗 SVG 文件 `public/flags/[lang].svg`
4. 在 OPEN_LANGS 中包含新语言代码

### Q: 如果语言文件缺失会怎样?
A: 系统会自动检测语言文件是否存在，如果不存在会：
1. 在启动时过滤掉该语言
2. 如果用户访问该语言路由，自动重定向到英语版本
3. 在控制台输出警告信息

### Q: 回退机制是如何工作的?
A: 回退机制有多个层级：
1. **配置层**: 过滤掉不存在的语言文件
2. **路由层**: 重定向无效语言到英语
3. **加载层**: 如果语言文件加载失败，使用英语文件
4. **最终回退**: 如果英语也失败，使用空配置避免崩溃 