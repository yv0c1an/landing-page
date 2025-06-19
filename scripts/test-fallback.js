#!/usr/bin/env node

/**
 * 测试回退机制脚本
 * 验证当语言配置不存在时是否正确回退到英语
 */

const fs = require('fs');
const path = require('path');

function testFallbackMechanism() {
  console.log('🔄 测试回退机制...\n');
  
  const testCases = [
    {
      name: '测试不存在的语言文件',
      env: { OPEN_LANGS: 'en,zh,nonexistent' },
      expected: ['en', 'zh'] // nonexistent 应该被过滤掉
    },
    {
      name: '测试空配置',
      env: { OPEN_LANGS: '' },
      expected: ['en'] // 应该回退到英语
    },
    {
      name: '测试无效配置',
      env: { OPEN_LANGS: 'invalid1,invalid2' },
      expected: ['en'] // 应该回退到英语
    },
    {
      name: '测试部分有效配置',
      env: { OPEN_LANGS: 'en,invalid,zh,invalid2,ja' },
      expected: ['en', 'zh', 'ja'] // 只保留有效的
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   配置: OPEN_LANGS=${testCase.env.OPEN_LANGS}`);
    
    // 设置环境变量
    const originalEnv = process.env.OPEN_LANGS;
    process.env.OPEN_LANGS = testCase.env.OPEN_LANGS;
    
    try {
      // 清除缓存
      delete require.cache[require.resolve('../src/lib/env-config.ts')];
      
      // 重新加载配置
      const { getEnabledLanguages, getFallbackLanguage } = require('../src/lib/env-config.ts');
      const result = getEnabledLanguages();
      
      console.log(`   结果: [${result.join(', ')}]`);
      console.log(`   期望: [${testCase.expected.join(', ')}]`);
      
      const isMatch = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
      console.log(`   ${isMatch ? '✅ 通过' : '❌ 失败'}\n`);
      
      // 测试回退函数
      console.log(`   测试回退函数:`);
      const fallbackTests = ['nonexistent', 'invalid', 'fr']; // fr文件不存在
      fallbackTests.forEach(locale => {
        const fallback = getFallbackLanguage(locale);
        console.log(`   - getFallbackLanguage('${locale}') = '${fallback}'`);
      });
      console.log('');
      
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}\n`);
    } finally {
      // 恢复环境变量
      if (originalEnv !== undefined) {
        process.env.OPEN_LANGS = originalEnv;
      } else {
        delete process.env.OPEN_LANGS;
      }
    }
  });
}

function checkLanguageFiles() {
  console.log('📁 检查语言文件状态...\n');
  
  const localesDir = path.join(__dirname, '../src/locales');
  const supportedLangs = ['en', 'zh', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'it', 'ru'];
  
  supportedLangs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.ts`);
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✅' : '❌'} ${lang}.ts ${exists ? '存在' : '不存在'}`);
  });
  console.log('');
}

function main() {
  console.log('🔄 回退机制测试');
  console.log('=' * 50);
  
  checkLanguageFiles();
  testFallbackMechanism();
  
  console.log('📝 回退机制说明:');
  console.log('1. 如果请求的语言文件不存在，自动回退到英语');
  console.log('2. 如果配置了无效的语言代码，会被自动过滤');
  console.log('3. 如果没有有效的语言配置，默认使用英语');
  console.log('4. 路由会自动重定向到有效的语言页面');
}

if (require.main === module) {
  main();
} 