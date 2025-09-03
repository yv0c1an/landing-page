#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
谷歌红名单批量检测工具
处理多个文件夹中的 url.txt 和 red_url.txt 文件
"""

import requests
import time
import os
from urllib.parse import urlparse
from typing import List, Tuple, Set
import json

# API 配置 - 使用 api.uouin.com
API_URL = "https://api.uouin.com/app/google"
API_USERNAME = "cclnmb"
API_KEY = "UmsRdNZyyyma69e"

# 请求配置
TIMEOUT = 8  # 超时时间（秒）
RETRIES = 2  # 重试次数
RETRY_DELAY = 1  # 重试延迟基数（秒）

# Telegram Bot 配置
TELEGRAM_BOT_TOKEN = "7312201066:AAFLgFEBZaIHr-NCA87yL9-rSf_79OdCrAY" #机器人token
TELEGRAM_CHAT_ID = "-4519587539"  #聊天id（群ID）
ENABLE_TELEGRAM_NOTIFICATION = bool(TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID)

# 通知标题配置
NOTIFICATION_TITLE = "🔍 *【大米商城】谷歌红名单检测报告*"  # 固定的通知标题
NOTIFICATION_SENDER = "瑞银检测机器人"  # 发送者名称

# 文件夹路径配置 - 定义要处理的文件夹数组
FOLDER_PATHS = [
    "/var/data/site1",      # 站点1的数据文件夹
    "/var/data/site2",      # 站点2的数据文件夹
    # 可以继续添加更多文件夹路径
]

# 如果要使用当前目录，可以这样配置：
# FOLDER_PATHS = [
#     os.path.dirname(__file__)  # 使用脚本所在目录
# ]

# 文件名定义
URL_FILE = "url.txt"        # 安全URL列表文件名
RED_URL_FILE = "red_url.txt" # 红名单URL列表文件名

def send_telegram_notification(message: str) -> bool:
    """发送 Telegram 通知"""
    if not ENABLE_TELEGRAM_NOTIFICATION:
        return False
    
    api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message,
        'parse_mode': 'Markdown'
    }
    
    try:
        response = requests.post(api_url, data=payload, timeout=5)
        response.raise_for_status()
        print(f"✓ Telegram 通知已发送")
        return True
    except Exception as e:
        print(f"✗ Telegram 通知发送失败: {e}")
        return False

def extract_domain(url: str) -> str:
    """从 URL 中提取域名"""
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
    
    parsed = urlparse(url)
    return parsed.netloc if parsed.netloc else url

def check_single_url(url: str) -> Tuple[bool, str]:
    """
    检测单个 URL 是否在谷歌红名单中
    
    Returns:
        (是否安全, 状态消息)
        True = 安全, False = 红名单, None = 检测失败
    """
    # 确保 URL 格式完整
    if not url.startswith(('http://', 'https://')):
        check_url = f"https://{url}"
    else:
        check_url = url
    
    domain = extract_domain(url)
    print(f"    检测: {domain}", end=" ... ")
    
    last_error = None
    
    # 重试机制
    for attempt in range(1, RETRIES + 1):
        try:
            # 新 API 的参数格式
            params = {
                'username': API_USERNAME,
                'key': API_KEY,
                'url': check_url  # 使用完整的 URL
            }
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            
            response = requests.get(
                API_URL,
                params=params,
                headers=headers,
                timeout=TIMEOUT
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # 根据 code 判断结果，不依赖 statu
                code = str(data.get('code', ''))  # 转为字符串比较
                
                if code == '1001':
                    # 域名正常
                    print("✅ 安全")
                    return True, "安全"
                elif code == '1002':
                    # 域名被封禁（红名单）
                    msg = data.get('msg', '已被封禁')
                    reason = data.get('reason', '')
                    describe = data.get('describe', '')
                    
                    print(f"❌ 红名单 - {msg}")
                    if reason or describe:
                        print(f"      详情: {reason} {describe}")
                    
                    return False, f"红名单 - {msg}"
                else:
                    # 未知状态码
                    statu = data.get('statu')
                    msg = data.get('msg', '未知')
                    
                    # 如果 statu 是 false 但 code 不是 1002，可能是其他错误
                    if statu == 'false' or statu is False:
                        print(f"⚠️ API错误: {msg}")
                        return None, f"API错误: {msg}"
                    else:
                        print(f"⚠️ 未知状态: code={code}, msg={msg}")
                        return None, f"未知状态: {code}"
            else:
                # 处理 HTTP 错误状态码
                last_error = f"HTTP {response.status_code}"
                
                # 尝试解析错误信息
                try:
                    error_data = response.json()
                    if 'msg' in error_data:
                        last_error = f"API错误: {error_data['msg']}"
                    elif 'message' in error_data:
                        last_error = f"API错误: {error_data['message']}"
                except:
                    pass
                
                # 如果是 4xx 或 5xx 错误，记录响应内容
                if response.status_code >= 400:
                    try:
                        error_text = response.text[:200]  # 只记录前200字符
                        print(f"\n    调试信息: {error_text}")
                    except:
                        pass
                
        except requests.exceptions.Timeout:
            last_error = "超时"
        except requests.exceptions.ConnectionError:
            last_error = "连接错误"
        except Exception as e:
            last_error = str(e)
        
        # 重试延迟
        if attempt < RETRIES:
            time.sleep(RETRY_DELAY * attempt)
    
    # 所有重试都失败
    print(f"⚠️ 检测失败: {last_error}")
    return None, f"检测失败: {last_error}"

def load_urls_from_file(filepath: str) -> List[str]:
    """从文件加载 URL 列表"""
    urls = []
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                url = line.strip()
                if url and not url.startswith('#'):
                    urls.append(url)
    return urls

def save_urls_to_file(filepath: str, urls: List[str]):
    """保存 URL 列表到文件"""
    with open(filepath, 'w', encoding='utf-8') as f:
        for url in urls:
            f.write(url + '\n')

def process_folder(folder_path: str) -> dict:
    """
    处理单个文件夹中的 URL 文件
    
    Returns:
        处理统计信息
    """
    print(f"\n{'=' * 60}")
    print(f"处理文件夹: {folder_path}")
    print(f"{'=' * 60}")
    
    # 构建文件路径
    safe_url_file = os.path.join(folder_path, URL_FILE)
    red_url_file = os.path.join(folder_path, RED_URL_FILE)
    
    # 检查文件夹是否存在
    if not os.path.exists(folder_path):
        print(f"⚠️ 文件夹不存在: {folder_path}")
        return {
            'folder': folder_path,
            'total': 0,
            'safe': 0,
            'unsafe': 0,
            'failed': 0,
            'newly_unsafe': [],
            'newly_safe': [],
            'error': '文件夹不存在'
        }
    
    # 统计数据
    stats = {
        'folder': folder_path,
        'total': 0,
        'safe': 0,
        'unsafe': 0,
        'failed': 0,
        'newly_unsafe': [],
        'newly_safe': []
    }
    
    # 确保文件存在
    for filepath in [safe_url_file, red_url_file]:
        if not os.path.exists(filepath):
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(f"# {os.path.basename(filepath)}\n")
            print(f"  已创建文件: {os.path.basename(filepath)}")
    
    # 加载现有的 URL
    safe_urls = load_urls_from_file(safe_url_file)
    red_urls = load_urls_from_file(red_url_file)
    
    print(f"  从 {URL_FILE} 加载了 {len(safe_urls)} 个 URL")
    print(f"  从 {RED_URL_FILE} 加载了 {len(red_urls)} 个 URL")
    
    # 合并所有需要检测的 URL（去重）
    all_urls = set(safe_urls + red_urls)
    
    if not all_urls:
        print("  没有找到需要检测的 URL")
        return stats
    
    print(f"\n  总计需要检测 {len(all_urls)} 个 URL:")
    print("-" * 60)
    
    # 新的分类列表
    new_safe_urls = []
    new_red_urls = []
    
    # 检测每个 URL
    for i, url in enumerate(all_urls, 1):
        print(f"  [{i}/{len(all_urls)}]", end=" ")
        is_safe, message = check_single_url(url)
        
        stats['total'] += 1
        
        if is_safe is True:
            # 安全的 URL
            new_safe_urls.append(url)
            stats['safe'] += 1
            
            # 如果原来在红名单中，现在变安全了
            if url in red_urls:
                stats['newly_safe'].append(url)
                
        elif is_safe is False:
            # 红名单 URL
            new_red_urls.append(url)
            stats['unsafe'] += 1
            
            # 如果原来在安全列表中，现在变红名了
            if url in safe_urls:
                stats['newly_unsafe'].append(url)
                
        else:
            # 检测失败，保持原状
            stats['failed'] += 1
            if url in safe_urls:
                new_safe_urls.append(url)
            elif url in red_urls:
                new_red_urls.append(url)
            else:
                new_safe_urls.append(url)  # 默认放入安全列表
        
        # 避免请求过快
        if i < len(all_urls):
            time.sleep(1.5)  # 遵守 API 的 1.5秒/次限制
    
    # 保存结果到文件
    print("\n" + "-" * 60)
    print("  正在更新文件...")
    
    save_urls_to_file(safe_url_file, new_safe_urls)
    print(f"  ✓ 已保存 {len(new_safe_urls)} 个安全 URL 到 {URL_FILE}")
    
    save_urls_to_file(red_url_file, new_red_urls)
    print(f"  ✓ 已保存 {len(new_red_urls)} 个红名单 URL 到 {RED_URL_FILE}")
    
    # 打印该文件夹的统计
    print(f"\n  文件夹统计:")
    print(f"    总计检测: {stats['total']} 个")
    print(f"    ✅ 安全: {stats['safe']} 个")
    print(f"    ❌ 红名单: {stats['unsafe']} 个")
    print(f"    ⚠️ 检测失败: {stats['failed']} 个")
    
    if stats['newly_unsafe']:
        print(f"\n  🚨 新发现的红名单 URL ({len(stats['newly_unsafe'])} 个):")
        for url in stats['newly_unsafe']:
            print(f"    - {extract_domain(url)}")
    
    if stats['newly_safe']:
        print(f"\n  ✅ 恢复安全的 URL ({len(stats['newly_safe'])} 个):")
        for url in stats['newly_safe']:
            print(f"    - {extract_domain(url)}")
    
    return stats

def process_all_folders():
    """处理所有配置的文件夹"""
    print("=" * 60)
    print("谷歌红名单批量检测工具 - 多文件夹版本")
    print("=" * 60)
    
    # 汇总统计
    total_stats = {
        'folders_processed': 0,
        'total': 0,
        'safe': 0,
        'unsafe': 0,
        'failed': 0,
        'all_newly_unsafe': [],
        'all_newly_safe': []
    }
    
    # 处理每个文件夹
    for folder_path in FOLDER_PATHS:
        folder_stats = process_folder(folder_path)
        
        if 'error' not in folder_stats:
            total_stats['folders_processed'] += 1
            total_stats['total'] += folder_stats['total']
            total_stats['safe'] += folder_stats['safe']
            total_stats['unsafe'] += folder_stats['unsafe']
            total_stats['failed'] += folder_stats['failed']
            
            # 添加文件夹信息到 URL 列表中
            for url in folder_stats['newly_unsafe']:
                total_stats['all_newly_unsafe'].append({
                    'url': url,
                    'folder': folder_path
                })
            
            for url in folder_stats['newly_safe']:
                total_stats['all_newly_safe'].append({
                    'url': url,
                    'folder': folder_path
                })
    
    # 打印总体统计
    print("\n" + "=" * 60)
    print("总体检测结果统计:")
    print("=" * 60)
    print(f"  处理文件夹数: {total_stats['folders_processed']} / {len(FOLDER_PATHS)}")
    print(f"  总计检测 URL: {total_stats['total']} 个")
    print(f"  ✅ 安全: {total_stats['safe']} 个")
    print(f"  ❌ 红名单: {total_stats['unsafe']} 个")
    print(f"  ⚠️ 检测失败: {total_stats['failed']} 个")
    
    # 发送 Telegram 通知 - 只在有状态变化时发送
    if ENABLE_TELEGRAM_NOTIFICATION:
        # 只在有新发现的红名单或恢复安全的 URL 时才发送通知
        if total_stats['all_newly_unsafe'] or total_stats['all_newly_safe']:
            notification = f"{NOTIFICATION_TITLE}\n"
            notification += f"{'=' * 30}\n\n"
            
            if total_stats['all_newly_unsafe']:
                notification += f"🚨 *新发现红名单 ({len(total_stats['all_newly_unsafe'])} 个):*\n"
                for item in total_stats['all_newly_unsafe']:
                    notification += f"• `{extract_domain(item['url'])}` ({os.path.basename(item['folder'])})\n"
                notification += "\n"
            
            if total_stats['all_newly_safe']:
                notification += f"✅ *恢复安全 ({len(total_stats['all_newly_safe'])} 个):*\n"
                for item in total_stats['all_newly_safe']:
                    notification += f"• `{extract_domain(item['url'])}` ({os.path.basename(item['folder'])})\n"
                notification += "\n"
            
            notification += f"⏰ 检测时间: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
            notification += f"📤 发送自: {NOTIFICATION_SENDER}"
            
            send_telegram_notification(notification)
            print("\n📱 已发送 Telegram 通知（有状态变化）")
        else:
            print("\n📱 无状态变化，不发送 Telegram 通知")
    
    print("\n" + "=" * 60)
    print("所有文件夹处理完成！")
    print("=" * 60)

def check_api_key():
    """检查 API Key 是否有效"""
    print("正在验证 API Key...")
    test_url = "https://google.com"
    
    params = {
        'username': API_USERNAME,
        'key': API_KEY,
        'url': test_url
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        response = requests.get(
            API_URL,
            params=params,
            headers=headers,
            timeout=5
        )
        
        if response.status_code == 200:
            print("✓ API Key 验证成功")
            return True
        else:
            print(f"⚠️ API 返回异常状态码: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ 无法连接到 API 服务: {e}")
        return False

def main():
    """主函数"""
    try:
        # 检查是否配置了文件夹
        if not FOLDER_PATHS:
            print("错误: 请在 FOLDER_PATHS 中配置要处理的文件夹路径")
            return
        
        # 先验证 API Key
        if not check_api_key():
            print("\n" + "=" * 60)
            print("无法继续执行，请解决 API Key 问题后重试")
            print("=" * 60)
            return
        
        print()  # 空行分隔
        
        # 执行批量检测
        process_all_folders()
        
    except KeyboardInterrupt:
        print("\n\n检测被用户中断")
    except Exception as e:
        print(f"\n错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()