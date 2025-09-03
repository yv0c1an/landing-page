#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试谷歌红名单 API 是否正常工作
"""

import requests
import json

# API 配置
API_URL = "https://openapi.chinaz.net/v1/1029/check_google"
API_KEY = "apiuser_quantity_bdf393c36eaab9e9f597054cda226b13_3e8293b29ef94265b5f412d4098799ed"
CHINAZ_VERSION = "1.0"

def test_api(url: str):
    """测试 API"""
    print(f"\n测试 URL: {url}")
    print("-" * 40)
    
    params = {
        'APIKey': API_KEY,
        'ChinazVer': CHINAZ_VERSION,
        'url': url
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    print(f"请求 URL: {API_URL}")
    print(f"请求参数: {json.dumps(params, indent=2)}")
    
    try:
        response = requests.get(
            API_URL,
            params=params,
            headers=headers,
            timeout=10
        )
        
        print(f"\n状态码: {response.status_code}")
        print(f"响应头: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"\n响应数据:")
            print(json.dumps(data, ensure_ascii=False, indent=2))
            
            # 解析结果
            if data.get('statu') == 'true':
                if data.get('code') == '1001':
                    print(f"\n✅ 结果: 安全")
                elif data.get('code') == '1002':
                    print(f"\n❌ 结果: 红名单")
                else:
                    print(f"\n⚠️ 结果: 未知状态 - {data.get('code')}")
            else:
                print(f"\n⚠️ API 返回失败: {data.get('msg')}")
        else:
            print(f"\n错误响应内容:")
            print(response.text[:500])
            
            # 尝试解析 JSON 错误
            try:
                error_data = response.json()
                print(f"\n错误详情:")
                print(json.dumps(error_data, ensure_ascii=False, indent=2))
            except:
                print("无法解析为 JSON")
                
    except requests.exceptions.Timeout:
        print("\n❌ 请求超时")
    except requests.exceptions.ConnectionError as e:
        print(f"\n❌ 连接错误: {e}")
    except Exception as e:
        print(f"\n❌ 未知错误: {e}")

def main():
    """主函数"""
    print("=" * 60)
    print("谷歌红名单 API 测试工具")
    print("=" * 60)
    
    # 测试几个不同的域名
    test_urls = [
        "google.com",           # 应该是安全的
        "axiacartsuperdiscount.com",  # 你遇到问题的域名
        "example.com",          # 标准测试域名
    ]
    
    for url in test_urls:
        test_api(url)
        print("\n" + "=" * 60)
    
    print("\n测试完成！")
    print("\n如果所有请求都返回 436 错误，可能的原因：")
    print("1. API Key 已过期或无效")
    print("2. API 服务暂时不可用")
    print("3. IP 被限制访问")
    print("4. 需要更新 API 参数格式")

if __name__ == "__main__":
    main()