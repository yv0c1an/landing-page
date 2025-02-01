# My Landing Page

这是一个使用 [Next.js](https://nextjs.org) 构建的多语言落地页项目。

## 技术栈

- Next.js 14.2.4
- React 18.2.0
- TypeScript
- TailwindCSS
- NextUI 组件库
- next-intl（国际化支持）
- Framer Motion（动画效果）
- React Hook Form（表单处理）
- Zod（数据验证）

## 功能特点

- 🌐 多语言支持
  - 中文
  - 英文
  - 日文
  - 韩文
  - 泰文

- 📱 响应式设计
  - 完美适配移动端和桌面端

- 🎨 模块化组件
  - Header/Footer 布局组件
  - Hero 主横幅区域
  - Features 特性展示
  - Testimonials 用户评价
  - PlatformInfo 平台信息
  - SellerBenefits 卖家权益
  - RegistrationSteps 注册步骤
  - SellerCases 卖家案例

## Internationalization (i18n) Updates

### Language Support
The application now supports multiple languages with improved switching functionality:
- English (en)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Thai (th)

### Key Features
- **Instant Language Switching**: Improved UI response when changing languages
- **Persistent Language Selection**: Language preference is maintained across page reloads
- **Enhanced Translations**: Updated translations for all supported languages including:
  - Login and registration flows
  - Seller center information
  - Shopping experience
  - Marketing content
  - Success stories
  - Platform features

### Technical Improvements
- Fixed language switcher in header to immediately reflect selected language
- Optimized routing for language changes using `next-intl`
- Enhanced state management for current locale
- Improved SEO with proper language meta tags

## 项目结构

```
src/
├── components/     # 组件目录
├── config/        # 配置文件
├── contexts/      # React Context
├── hooks/         # 自定义 Hooks
├── locales/       # 多语言文件
├── styles/        # 样式文件
└── utils/         # 工具函数
```

## 开始使用

1. 安装依赖：

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

2. 配置环境变量：

```bash
cp .env.example .env
```
然后根据需要修改 `.env` 文件中的配置。

3. 运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 构建和部署

1. 构建生产版本：

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

2. 运行生产版本：

```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 开发工具

- ESLint - 代码检查
- PostCSS - CSS 处理
- 环境变量支持

## 贡献指南

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
