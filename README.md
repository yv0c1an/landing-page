# 落地页项目

基于Next.js的多语言落地页项目。

## 技术栈

- Next.js 14.2.4
- React 18.2.0
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
### 2024-04-19、
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
| NEXT_PUBLIC_TITLE | 网站标题 | 
| NEXT_PUBLIC_API_URL | API服务器地址 | 
| NEXT_PUBLIC_URL_LIST_ENDPOINT | URL列表接口地址 |

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
