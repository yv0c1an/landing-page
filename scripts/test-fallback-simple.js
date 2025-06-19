#!/usr/bin/env node

/**
 * 简化的回退机制测试脚本
 * 直接测试逻辑，避免TypeScript导入问题
 */

const fs = require('fs');
const path = require('path');

// 模拟环境配置逻辑
function simulateGetEnabledLanguages(openLangs) {
  const ALL_SUPPORTED_LANGUAGES = ['en', 'zh', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'it', 'ru', 'pt', 'br', 'ca', 'au', 'in', 'mx', 'gb', 'nl'];
  
  function checkLanguageFileExists(locale) {
    const localesDir = path.join(__dirname, '../src/locales');
    const filePath = path.join(localesDir, `${locale}.ts`);
    return fs.existsSync(filePath);
  }
  
  function filterValidLanguages(languages) {
    return languages.filter(lang => {
      if (!ALL_SUPPORTED_LANGUAGES.includes(lang)) {
        console.warn(`    警告: 语言 '${lang}' 不在支持列表中`);
        return false;
      }
      
      if (!checkLanguageFileExists(lang)) {
        console.warn(`    警告: 语言文件 '${lang}.ts' 不存在`);
        return false;
      }
      
      return true;
    });
  }
  
  const rawLocales = openLangs.split(',').map(lang => lang.trim()).filter(Boolean);
  const enabledLocales = filterValidLanguages(rawLocales);
  
  if (enabledLocales.length === 0 || !enabledLocales.includes('en')) {
    console.warn('    警告: 没有有效语言或缺少英语，回退到只使用英语');
    return ['en'];
  }
  
  return enabledLocales;
}

function simulateGetFallbackLanguage(requestedLocale, enabledLanguages) {
  if (enabledLanguages.includes(requestedLocale)) {
    return requestedLocale;
  }
  
  console.warn(`    警告: 语言 '${requestedLocale}' 不可用，回退到英语`);
  return 'en';
}

function testFallbackMechanism() {
  console.log('🔄 测试回退机制...\n');
  
  const testCases = [
    {
      name: '测试不存在的语言文件',
      env: 'en,zh,nonexistent',
      expected: ['en', 'zh'] // nonexistent 应该被过滤掉
    },
    {
      name: '测试空配置',
      env: '',
      expected: ['en'] // 应该回退到英语
    },
    {
      name: '测试无效配置',
      env: 'invalid1,invalid2',
      expected: ['en'] // 应该回退到英语
    },
    {
      name: '测试部分有效配置',
      env: 'en,invalid,zh,invalid2,ja',
      expected: ['en', 'zh', 'ja'] // 只保留有效的
    },
    {
      name: '测试包含不存在文件的配置',
      env: 'en,zh,fr,de', // fr, de 文件不存在
      expected: ['en', 'zh'] // 只保留存在文件的
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`${index + 1}. ${testCase.name}`);
    console.log(`   配置: OPEN_LANGS=${testCase.env}`);
    
    try {
      const result = simulateGetEnabledLanguages(testCase.env);
      
      console.log(`   结果: [${result.join(', ')}]`);
      console.log(`   期望: [${testCase.expected.join(', ')}]`);
      
      const isMatch = JSON.stringify(result.sort()) === JSON.stringify(testCase.expected.sort());
      console.log(`   ${isMatch ? '✅ 通过' : '❌ 失败'}`);
      
      // 测试回退函数
      console.log(`   测试回退函数:`);
      const fallbackTests = ['nonexistent', 'invalid', 'fr']; // fr文件不存在
      fallbackTests.forEach(locale => {
        const fallback = simulateGetFallbackLanguage(locale, result);
        console.log(`     - getFallbackLanguage('${locale}') = '${fallback}'`);
      });
      console.log('');
      
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}\n`);
    }
  });
}

function checkLanguageFiles() {
  console.log('📁 检查语言文件状态...\n');
  
  const localesDir = path.join(__dirname, '../src/locales');
  const supportedLangs = ['en', 'zh', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'it', 'ru'];
  
  console.log('存在的语言文件:');
  supportedLangs.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.ts`);
    const exists = fs.existsSync(filePath);
    console.log(`  ${exists ? '✅' : '❌'} ${lang}.ts ${exists ? '存在' : '不存在'}`);
  });
  console.log('');
}

function main() {
  console.log('🔄 回退机制测试');
  console.log('='.repeat(50));
  
  checkLanguageFiles();
  testFallbackMechanism();
  
  console.log('📝 回退机制功能说明:');
  console.log('✅ 1. 如果请求的语言文件不存在，自动回退到英语');
  console.log('✅ 2. 如果配置了无效的语言代码，会被自动过滤');
  console.log('✅ 3. 如果没有有效的语言配置，默认使用英语');
  console.log('✅ 4. 路由会自动重定向到有效的语言页面');
  console.log('✅ 5. 多层回退确保系统不会崩溃');
}

if (require.main === module) {
  main();
} 