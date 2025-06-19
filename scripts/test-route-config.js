#!/usr/bin/env node

/**
 * 测试路由配置脚本
 * 验证语言路由是否正确配置
 */

const fs = require('fs');
const path = require('path');

// 模拟环境变量
process.env.OPEN_LANGS = 'en,zh,ja,ko,th';

async function testRouteConfig() {
  console.log('🔍 检查路由配置...\n');
  
  try {
    // 1. 检查环境配置
    const { getEnabledLanguages } = require('../src/lib/env-config.ts');
    const enabledLangs = getEnabledLanguages();
    console.log('✅ 启用的语言:', enabledLangs.join(', '));
    
    // 2. 检查语言文件是否存在
    console.log('\n📁 检查语言文件:');
    const localesDir = path.join(__dirname, '../src/locales');
    
    for (const lang of enabledLangs) {
      const filePath = path.join(localesDir, `${lang}.ts`);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${lang}.ts - 存在`);
      } else {
        console.log(`❌ ${lang}.ts - 不存在`);
      }
    }
    
    // 3. 检查国旗SVG文件
    console.log('\n🏁 检查国旗文件:');
    const flagsDir = path.join(__dirname, '../public/flags');
    
    for (const lang of enabledLangs) {
      const flagPath = path.join(flagsDir, `${lang}.svg`);
      if (fs.existsSync(flagPath)) {
        console.log(`✅ ${lang}.svg - 存在`);
      } else {
        console.log(`❌ ${lang}.svg - 不存在`);
      }
    }
    
    // 4. 检查路由页面配置
    console.log('\n🔗 检查路由页面配置:');
    const indexPath = path.join(__dirname, '../pages/[locale]/index.tsx');
    const codeOfConductPath = path.join(__dirname, '../pages/[locale]/code-of-conduct.tsx');
    
    // 读取并检查index.tsx
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      if (indexContent.includes('getEnabledLanguages')) {
        console.log('✅ pages/[locale]/index.tsx - 已更新使用动态语言配置');
      } else {
        console.log('❌ pages/[locale]/index.tsx - 仍使用硬编码语言配置');
      }
    }
    
    // 读取并检查code-of-conduct.tsx
    if (fs.existsSync(codeOfConductPath)) {
      const conductContent = fs.readFileSync(codeOfConductPath, 'utf-8');
      if (conductContent.includes('getEnabledLanguages')) {
        console.log('✅ pages/[locale]/code-of-conduct.tsx - 已更新使用动态语言配置');
      } else {
        console.log('❌ pages/[locale]/code-of-conduct.tsx - 仍使用硬编码语言配置');
      }
    }
    
    console.log('\n🎯 测试结果总结:');
    console.log('如果所有检查都显示 ✅，那么配置应该是正确的。');
    console.log('现在可以启动开发服务器测试语言切换功能。');
    
  } catch (error) {
    console.error('❌ 测试过程中出现错误:', error.message);
  }
}

function main() {
  console.log('🌍 路由配置测试');
  console.log('=' * 50);
  testRouteConfig();
}

if (require.main === module) {
  main();
} 