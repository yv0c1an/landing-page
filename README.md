# 我的落地页

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

## 功能更新

### 多语言支持
本次更新完善了多语言支持功能，现支持以下语言：
- 英语 (en)
- 中文 (zh)
- 日语 (ja)
- 韩语 (ko)
- 泰语 (th)

### 主要功能
- **即时语言切换**：优化了语言切换的用户体验，切换后立即更新界面
- **语言选择记忆**：保持用户的语言选择，页面刷新后依然保持所选语言
- **完善的翻译内容**：更新了所有支持语言的翻译，包括：
  - 登录和注册流程
  - 卖家中心信息
  - 购物体验
  - 营销内容
  - 成功案例
  - 平台特色

### 技术改进
- 修复了头部导航栏语言切换器，现在可以立即显示所选语言
- 使用 `next-intl` 优化了语言路由切换
- 增强了当前语言状态管理
- 改进了SEO相关的语言元标签

### 界面优化
- **导航栏改进**
  - 优化了移动端菜单布局
  - 改进了语言切换下拉菜单的交互体验
  - 更新了导航链接的显示效果

- **首页更新**
  - 优化了英雄区域的视觉效果
  - 更新了功能展示区的内容布局
  - 改进了卖家案例展示部分
  - 优化了注册流程说明
  - 更新了平台优势展示

- **响应式设计**
  - 优化了所有组件在移动端的显示效果
  - 改进了图片加载和显示策略
  - 更新了字体大小和间距的响应式调整

### 性能优化
- 优化了图片资源加载
- 改进了组件渲染性能
- 优化了路由切换速度
- 提升了多语言切换的响应速度

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
