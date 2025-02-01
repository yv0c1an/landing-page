# My Landing Page

这是一个使用 [Next.js](https://nextjs.org) 构建的多语言落地页项目。

## 技术栈

- Next.js 14.2.4
- React 18.2.0
- TypeScript
- TailwindCSS
- Shadcn/UI 组件库
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
  - 移动端抽屉式菜单

- 🎨 模块化组件
  - Header/Footer 布局组件
  - Hero 主横幅区域
  - Features 特性展示
  - Testimonials 用户评价
  - PlatformInfo 平台信息
  - SellerBenefits 卖家权益
  - RegistrationSteps 注册步骤
  - SellerCases 卖家案例

- 🔄 外部链接处理
  - 统一的重定向确认弹窗
  - 支持多种外部链接类型
  - 安全的链接跳转机制

## 最新更新

### Shadcn/UI 组件迁移 (2025-02-01)

- 完成从 NextUI 到 Shadcn/UI 的组件库迁移
- 新增功能：
  - 重构导航栏，优化移动端体验
  - 统一的按钮样式和交互效果
  - 新的对话框和抽屉组件实现
  - 优化的语言切换下拉菜单
  - 统一的外部链接处理机制

## 项目结构

```
src/
├── components/     # 组件目录
│   ├── ui/        # Shadcn/UI 组件
│   ├── common/    # 通用组件
│   ├── home/      # 首页相关组件
│   └── layout/    # 布局组件
├── config/        # 配置文件
├── contexts/      # React Context
├── hooks/         # 自定义 Hooks
├── locales/       # 多语言文件
├── styles/        # 样式文件
└── utils/         # 工具函数
```

## 开发指南

### 环境要求

- Node.js 18.x 或更高版本
- pnpm 8.x

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 组件使用指南

### 按钮组件

按钮组件支持多种样式变体：

- `default`: 主要按钮，用于重要操作
- `ghost`: 透明背景按钮，用于导航栏
- `outline`: 带边框的按钮
- `link`: 链接样式按钮

示例：
```tsx
<Button variant="ghost">
  点击我
</Button>
```

### 外部链接处理

使用 `useExternalLink` hook 处理外部链接：

```tsx
const { handleExternalClick } = useExternalLink();

<Button onClick={() => handleExternalClick('promote')}>
  促销页面
</Button>
```

### 语言切换

语言切换功能通过 `next-intl` 实现，支持路由自动适配：

```tsx
const handleLanguageChange = (newLocale: string) => {
  // 自动处理语言切换和路由更新
};
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT License
