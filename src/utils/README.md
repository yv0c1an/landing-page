# URL 处理工具模块

本目录包含了重构后的 URL 处理相关工具函数，遵循"一个功能一个文件"的设计原则。

## 文件结构

### 核心工具模块

- **`urlValidator.ts`** - URL 验证工具
  - `isValidUrl()` - 验证 URL 格式
  - `sanitizePath()` - 清理路径，防止路径遍历攻击
  - `extractDomain()` - 从 URL 中提取域名

- **`urlAvailabilityChecker.ts`** - URL 可用性检查器
  - `checkUrlAvailability()` - 检查 URL 是否可以正常访问

- **`googleRedListChecker.ts`** - 谷歌红名单检查器
  - `checkGoogleRedList()` - 通过第三方 API 检查域名是否在谷歌红名单中

- **`urlFileManager.ts`** - URL 文件管理器
  - `readUrlsFromFile()` - 读取 URL 文件并返回有效的 URL 列表
  - `writeUrlsToFile()` - 将 URL 列表写入文件
  - `updateUrlFiles()` - 更新 URL 文件，将不安全的 URL 移动到红名单

- **`urlSecurityChecker.ts`** - URL 安全检查器
  - `performSecurityCheck()` - 执行完整的 URL 安全检查（整合所有检查功能）

### 通用工具模块

- **`arrayUtils.ts`** - 数组工具函数
  - `getRandomItem()` - 从数组中随机选择一个元素
  - `shuffleArray()` - 随机打乱数组顺序

- **`SafeBrowsingCheck.ts`** - SafeBrowsing 检查器（已存在）

### 配置管理

- **`../config/urlChecker.ts`** - URL 检查器配置文件 🆕
  - `GOOGLE_CHECK_CONFIG` - 谷歌红名单检查配置
  - `AVAILABILITY_CHECK_CONFIG` - URL 可用性检查配置
  - `SAFE_BROWSING_CONFIG` - SafeBrowsing 检查配置
  - `FILE_PATHS` - 文件路径配置
  - `LOG_CONFIG` - 日志配置

### 类型定义

- **`../types/api.ts`** - API 相关类型定义
  - `PlatformResponse` - 平台响应接口类型
  - `GoogleCheckResponse` - 谷歌验证红名单接口响应类型
  - `SecurityCheckResult` - URL 安全检查结果类型

## 配置说明

### 🔧 配置文件 (`src/config/urlChecker.ts`)

所有的配置选项都集中在这个文件中，便于统一管理和调整：

```typescript
// 谷歌红名单检查配置
export const GOOGLE_CHECK_CONFIG = {
  apiUrl: 'https://openapi.chinaz.net/v1/1029/check_google',
  apiKey: 'your-api-key',
  version: '1.0',
  timeout: 8000, // 8秒超时
  retries: 2, // 重试2次
  retryDelay: 1000 // 重试延迟基数（毫秒）
};

// URL 可用性检查配置
export const AVAILABILITY_CHECK_CONFIG = {
  timeout: 5000, // 5秒超时
  maxRedirects: 0, // 不跟随重定向
  retries: 1, // 重试1次
  retryDelay: 500 // 重试延迟（毫秒）
};

// 日志配置
export const LOG_CONFIG = {
  enableDetailedLogs: process.env.NODE_ENV == 'production', // 生产环境启用详细日志
  enableErrorLogs: true // 始终启用错误日志
};
```

### 📝 日志控制

通过 `LOG_CONFIG` 可以控制日志输出：

- **`enableDetailedLogs`** - 控制详细日志输出（包括调试信息）
- **`enableErrorLogs`** - 控制错误日志输出

## 使用示例

```typescript
// 在 API 路由中使用
import { sanitizePath } from '@/utils/urlValidator';
import { readUrlsFromFile, updateUrlFiles } from '@/utils/urlFileManager';
import { performSecurityCheck } from '@/utils/urlSecurityChecker';
import { shuffleArray } from '@/utils/arrayUtils';
import { FILE_PATHS, LOG_CONFIG } from '@/config/urlChecker';

// 使用配置文件中的路径
const filePath = path.join(process.cwd(), FILE_PATHS.urlList);
const redFilePath = path.join(process.cwd(), FILE_PATHS.redList);

// 清理路径
const cleanPath = sanitizePath(userInput);

// 读取 URL 列表
const urls = readUrlsFromFile(filePath);

// 随机打乱 URL 列表
const shuffledUrls = shuffleArray(urls);

// 执行安全检查
for (const url of shuffledUrls) {
  if (LOG_CONFIG.enableDetailedLogs) {
    console.log(`Checking URL: ${url}`);
  }
  
  const result = await performSecurityCheck(url);
  if (result.isSecure) {
    // 使用安全的 URL
    break;
  }
}
```

## 设计优势

1. **单一职责原则** - 每个文件只负责一个特定功能
2. **高内聚低耦合** - 相关功能聚集在一起，模块间依赖最小化
3. **统一配置管理** - 所有配置集中管理，便于调整和维护 🆕
4. **灵活的日志控制** - 可根据环境和需求调整日志输出 🆕
5. **易于测试** - 每个工具函数都可以独立测试
6. **易于维护** - 修改某个功能时只需要关注对应的文件
7. **代码复用** - 工具函数可以在其他地方复用
8. **清晰的依赖关系** - 通过 import 可以清楚看到模块间的依赖

## 依赖关系图

```
pages/api/urls.ts
├── @/utils/urlValidator
├── @/utils/urlFileManager
│   └── @/utils/urlValidator
├── @/utils/urlSecurityChecker
│   ├── @/utils/SafeBrowsingCheck
│   ├── @/utils/googleRedListChecker
│   │   ├── @/utils/urlValidator
│   │   └── @/config/urlChecker 🆕
│   ├── @/utils/urlAvailabilityChecker
│   │   └── @/config/urlChecker 🆕
│   └── @/config/urlChecker 🆕
├── @/utils/arrayUtils
├── @/types/api
└── @/config/urlChecker 🆕
```

## 配置调优建议

### 🚀 性能优化
- 根据网络环境调整 `timeout` 值
- 根据 API 稳定性调整 `retries` 次数
- 根据服务器负载调整 `retryDelay` 延迟

### 🔍 调试模式
- 开发环境：设置 `enableDetailedLogs: true` 查看详细信息
- 生产环境：设置 `enableDetailedLogs: false` 减少日志输出

### 📁 文件管理
- 可通过 `FILE_PATHS` 配置自定义文件路径
- 支持相对路径和绝对路径

这种模块化和配置化的设计使得代码更加清晰、可维护，并且便于单元测试和功能扩展。 