# 落地页项目

基于Next.js的多语言落地页项目。

## 技术栈

- Next.js 15.3.1
- React 19.1.0
- TypeScript
- TailwindCSS
- Shadcn/UI
- next-intl
- Framer Motion

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 构建
pnpm build
```

## 项目结构

```
src/
├── components/     # 组件
│   ├── ui/        # UI组件
│   ├── common/    # 通用组件
│   ├── home/      # 首页组件
│   └── layout/    # 布局组件
├── config/        # 配置文件
├── contexts/      # React Context
├── hooks/         # 自定义Hooks
├── locales/       # 多语言文件
├── styles/        # 样式文件
└── utils/         # 工具函数
pages/
├── api/           # API路由
└── [locale]/      # 多语言页面
```

## 修改日志
### 2024-04-22
- 升级 Next.js 从 14.1.0 到 15.3.1 以修复严重安全漏洞
- 升级 React 从 18.2.0 到 19.1.0
- 修改了页面上其他商家入驻的按钮链接
- 修改跳转方式为打开新标签
- 修改了url加载方式为本地url.txt
- 增加了robots.txt和security.txt文件
- 增加了全面的安全配置（CSP、安全头部等）
- 实现了URL安全检测与过滤系统

### 2024-04-19
- 移除Home组件中的Head设置
- 设置手机端链接为最终链接，不经过跳转
- 修复多语言切换Bug，默认打开EN

### 2024-03-30
- **外部链接处理**：重构`useExternalLink`钩子，改为实时获取URL
- **UI优化**：替换Bogle字体为Inter字体，修复移动导航样式
- **多语言**：添加缺失翻译键（common.redirecting等）
- **性能**：减少API调用，移除冗余代码

## 环境变量

复制`.env.example`为`.env.local`并配置以下项：

| 变量名 | 说明 |
|-------|------|
| NEXT_PUBLIC_APP_NAME | 应用名称 |
| NEXT_PUBLIC_BASE_URL | 网站基础URL |
| NEXT_PUBLIC_API_URL | API服务器地址 | 
| NEXT_PUBLIC_TITLE | SEO 标题 |
| NEXT_PUBLIC_DESCRIPTION | SEO 描述 |
| GOOGLE_SAFE_BROWSING_API_KEY | Google Safe Browsing API 密钥（服务端） |
| DEFAULT_LOCALE | 默认语言 (en/zh) |

**注意**: `GOOGLE_SAFE_BROWSING_API_KEY` 是服务端环境变量，不要添加 `NEXT_PUBLIC_` 前缀，以保护其不被暴露到客户端。

## 常用组件

### 外部链接

```tsx
const { handleExternalClick } = useExternalLink();

<Button onClick={() => handleExternalClick('/path/')}>
  按钮文本
</Button>
```

### 语言切换

```tsx
const handleLanguageChange = (newLocale: string) => {
  // 切换语言
};
```

## 项目安全方案

为确保网站不被 Google Safe Browsing 或其他安全工具标记为危险网站，本项目实施了以下安全策略：

### 1. 安全配置与防御措施

#### 1.1 内容安全策略 (CSP)

在 `next.config.js` 中配置了严格的 CSP 策略：

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://safebrowsing.googleapis.com; frame-src 'none'; object-src 'none';"
}
```

#### 1.2 其他安全头部

```javascript
// HSTS 头部
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains'
},
// 防止浏览器 MIME 嗅探
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
},
// 防止点击劫持
{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
},
// 引用来源策略
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin'
},
// 权限策略
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=()'
}
```

#### 1.3 URL 安全处理

- 实现了严格的 URL 验证和清理
- 使用 `window.open()` 代替 `location.href`，并添加安全参数
- 防止路径遍历攻击
- 过滤非 HTTP/HTTPS 协议的 URL

#### 1.4 防止信息泄露

- 生产环境中隐藏敏感错误信息
- 不显示完整的 URL 信息，只记录必要的操作
- API 密钥存储在服务端环境变量中，而非客户端

### 2. URL 安全检测系统

#### 2.1 Google Safe Browsing API 集成

项目使用 Google Safe Browsing API 检查外部 URL：

```typescript
// 在环境变量中设置 API 密钥
GOOGLE_SAFE_BROWSING_API_KEY=your_api_key_here
```

#### 2.2 安全/不安全 URL 处理机制

- 自动将不安全 URL 添加到黑名单 (`red_url.txt`)
- 维护安全 URL 白名单 (`url.txt`)
- 只返回经过双重检验（安全性和可用性）的 URL

### 3. 安全维护流程

#### 3.1 定期安全审计

```bash
# 检查依赖中的安全漏洞
npm run security-check

# 修复发现的安全漏洞
npm run security-fix

# 更新所有依赖到安全版本
npm run security-update
```

#### 3.2 依赖管理

- 定期更新所有依赖到最新安全版本
- 特别关注具有已知安全漏洞的软件包
- 目前已将 Next.js 升级到 15.x 版本以修复安全漏洞

#### 3.3 安全报告

使用 `security.txt` 文件告知安全研究人员如何报告安全问题：

```
# 位于 public/.well-known/security.txt
Contact: mailto:security@example.com
Expires: 2025-12-31T23:59:59Z
Preferred-Languages: en, zh
Policy: https://example.com/security-policy
```

### 4. 部署安全最佳实践

#### 4.1 环境变量管理

- 使用 `.env.local` 存储开发环境变量（不提交）
- 生产环境使用服务器端环境变量或 `.env.production`
- 提供 `.env.example` 作为模板和文档

#### 4.2 HTTPS 实施

- 强制使用 HTTPS（通过 HSTS 头部）
- 建议使用 Let's Encrypt 等服务获取免费 SSL 证书

#### 4.3 安全监控

- 建议在 Google Search Console 中注册网站以接收安全通知
- 定期检查服务器日志中的异常访问
- 设置监控系统检测异常流量

### 5. 其他防护措施

#### 5.1 限制爬虫

已添加 `robots.txt` 文件，禁止爬虫爬取敏感路径：

```
User-agent: *
Disallow: /api/
```

#### 5.2 避免 XSS 攻击

- 使用 React 的内置 XSS 防护
- 不使用 `dangerouslySetInnerHTML` 处理不可信内容
- 使用适当的转义处理用户输入

#### 5.3 API 安全

- 设置请求超时
- 限制重定向次数
- 使用自定义 User-Agent
- 禁用请求中的 cookies

通过实施以上安全策略，本项目有效减少了被 Google Safe Browsing 和其他安全工具标记为危险网站的风险。持续维护并遵循这些最佳实践对保持网站安全至关重要。
