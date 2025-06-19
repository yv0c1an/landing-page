#!/usr/bin/env node

/**
 * 测试多语言环境变量配置脚本
 * 用法: node scripts/test-i18n-config.js
 */

// 模拟不同的环境变量配置
const testConfigs = [
  { name: '默认配置 (无环境变量)', env: {} },
  { name: '只启用中英文', env: { OPEN_LANGS: 'en,zh' } },
  { name: '启用5种语言', env: { OPEN_LANGS: 'en,zh,ja,ko,th' } },
  { name: '启用所有支持的语言', env: { OPEN_LANGS: 'en,zh,ja,ko,th,fr,de,es,it,ru,pt,br,ca,au,in,mx,gb,nl' } },
  { name: '包含无效语言代码', env: { OPEN_LANGS: 'en,zh,invalid,ja' } },
  { name: '空配置', env: { OPEN_LANGS: '' } },
];

function testConfiguration(config) {
  console.log(`\n=== 测试: ${config.name} ===`);
  
  // 设置环境变量
  const originalEnv = process.env.OPEN_LANGS;
  if (config.env.OPEN_LANGS !== undefined) {
    process.env.OPEN_LANGS = config.env.OPEN_LANGS;
  } else {
    delete process.env.OPEN_LANGS;
  }
  
  try {
    // 清除模块缓存以便重新加载
    delete require.cache[require.resolve('../src/lib/env-config.ts')];
    delete require.cache[require.resolve('../src/config/i18n.ts')];
    
    // 重新加载配置
    const { getEnabledLanguages } = require('../src/lib/env-config.ts');
    const enabledLangs = getEnabledLanguages();
    
    console.log(`环境变量 OPEN_LANGS: ${config.env.OPEN_LANGS || '(未设置)'}`);
    console.log(`启用的语言: ${enabledLangs.join(', ')}`);
    console.log(`语言数量: ${enabledLangs.length}`);
    
    // 验证结果
    if (enabledLangs.length === 0) {
      console.log('⚠️  警告: 没有启用任何语言');
    } else if (!enabledLangs.includes('en')) {
      console.log('⚠️  警告: 默认语言 (en) 未包含在内');
    } else {
      console.log('✅ 配置正常');
    }
    
  } catch (error) {
    console.log(`❌ 错误: ${error.message}`);
  } finally {
    // 恢复原始环境变量
    if (originalEnv !== undefined) {
      process.env.OPEN_LANGS = originalEnv;
    } else {
      delete process.env.OPEN_LANGS;
    }
  }
}

function main() {
  console.log('🌍 多语言环境变量配置测试');
  console.log('=' * 50);
  
  testConfigs.forEach(testConfiguration);
  
  console.log('\n\n📝 使用说明:');
  console.log('1. 在项目根目录创建 .env.local 文件');
  console.log('2. 添加 OPEN_LANGS=en,zh,ja,ko,th (根据需要调整语言)');
  console.log('3. 重启开发服务器');
  console.log('4. 语言切换器将只显示配置的语言');
  
  console.log('\n📖 更多信息请查看: docs/env-config.md');
}

if (require.main === module) {
  main();
} 