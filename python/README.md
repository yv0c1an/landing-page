# 谷歌红名单批量检测工具

自动批量检测多个文件夹中 URL 的谷歌红名单状态，支持自动分类管理和 Telegram 通知。

## ✨ 功能特点

- 🔍 **批量检测**：自动处理多个文件夹中的 URL
- 📁 **智能分类**：每个文件夹独立管理 `url.txt`（安全）和 `red_url.txt`（红名单）
- 🔄 **自动迁移**：
  - 新发现的红名单 URL 自动从 `url.txt` 移到 `red_url.txt`
  - 恢复安全的 URL 自动从 `red_url.txt` 移回 `url.txt`
- 📱 **精准通知**：仅在发现新红名单或域名恢复安全时发送 Telegram 通知
- 🔁 **容错机制**：检测失败自动重试 2 次

## 📦 安装

```bash
pip install requests
```

## ⚙️ 配置

在 `google_redlist_checker.py` 中配置以下参数：

### API 配置
```python
API_URL = "https://api.uouin.com/app/google"
API_USERNAME = "cclnmb"  
API_KEY = "UmsRdNZyyyma69e"
```

### 文件夹路径
```python
FOLDER_PATHS = [
    "/path/to/folder1",    # 第一个站点文件夹
    "/path/to/folder2",    # 第二个站点文件夹
    # 添加更多文件夹...
]
```

### Telegram 通知（可选）
```python
TELEGRAM_BOT_TOKEN = "你的Bot Token"
TELEGRAM_CHAT_ID = "你的Chat ID"
NOTIFICATION_TITLE = "🔍 *【大米商城】谷歌红名单检测报告*"
```

## 🚀 使用方法

### 运行脚本
```bash
python google_redlist_checker.py
```

### 执行流程
1. 遍历所有配置的文件夹
2. 读取每个文件夹的 `url.txt` 和 `red_url.txt`
3. 批量检测所有 URL 的状态
4. 自动重新分类并更新文件
5. 仅在有状态变化时发送 Telegram 通知

## 📂 文件结构

```
folder1/
├── url.txt       # 安全 URL 列表
└── red_url.txt   # 红名单 URL 列表

folder2/
├── url.txt       # 安全 URL 列表  
└── red_url.txt   # 红名单 URL 列表
```

**URL 格式**（每行一个）：
```
example.com
http://example.com
https://example.com
# 注释行（会被忽略）
```

## 🔄 工作原理

1. **读取**：加载每个文件夹的 URL 列表
2. **检测**：通过 API 检查每个 URL 的状态
3. **分类**：
   - ✅ 安全 → `url.txt`
   - ❌ 红名单 → `red_url.txt`
   - ⚠️ 失败 → 保持原位置
4. **通知**：仅在状态变化时发送通知

## 📊 API 响应格式

**安全域名**：
```json
{
  "code": "1001",
  "msg": "正常访问",
  "statu": "true"
}
```

**红名单域名**：
```json
{
  "code": "1002", 
  "msg": "已被封禁",
  "statu": "false"
}
```

## ⏰ 定时执行

```bash
# 添加到 crontab
crontab -e

# 每6小时执行一次
0 */6 * * * cd /path/to/python && python google_redlist_checker.py >> check.log 2>&1
```

## 📝 注意事项

- API 请求频率限制：1.5秒/次
- 文件夹不存在时会自动跳过
- 文件不存在时会自动创建
- 仅在发现新红名单或恢复安全时发送通知