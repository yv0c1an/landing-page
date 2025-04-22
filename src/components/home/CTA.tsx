import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { useExternalLink } from '@/hooks/useExternalLink';
import { RedirectModal } from '@/components/common/RedirectModal';
import { Check, ArrowRight, TrendingUp } from 'lucide-react';

const CTA = () => {
  const t = useTranslations();
  const { 
    handleExternalClick, 
    isRedirectModalOpen,
    handleClose,
    error
  } = useExternalLink();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#172554]">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-blue-50 text-lg mb-8 leading-relaxed opacity-90">
              {t('cta.subtitle')}
            </p>
            <p className="text-blue-50 mb-8 leading-relaxed opacity-80">
              {t('cta.description')}
            </p>
            
            <div className="mb-8">
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.li 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="mr-3 p-1.5 bg-emerald-500 rounded-full text-white flex-shrink-0 mt-1">
                      <Check size={14} />
                    </span>
                    <span className="text-blue-50 text-lg opacity-90">{t(`cta.features.${i-1}`)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* 注册按钮 */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 h-auto rounded-xl shadow-lg shadow-blue-600/30 text-lg font-medium"
                onClick={() => handleExternalClick('/promote/')}
              >
                {t('cta.registerNow')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          {/* 右侧统计数据 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-lg rounded-2xl p-8 relative border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  {['markets', 'merchants'].map((key, idx) => (
                    <div 
                      key={idx} 
                      className="p-6 rounded-xl bg-gradient-to-br from-white/[0.08] to-transparent hover:from-white/[0.12] hover:to-white/[0.02] transition-colors border border-white/10"
                    >
                      <div className="text-4xl font-bold text-white mb-2">
                        {t(`cta.stats.${key}.number`)}
                      </div>
                      <div className="text-blue-100 opacity-80">
                        {t(`cta.stats.${key}.label`)}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2 p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 hover:from-emerald-500/30 hover:to-emerald-400/20 transition-colors border border-emerald-400/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                      <div className="text-4xl font-bold text-white">
                        {t('cta.stats.growth.number')}
                      </div>
                    </div>
                    <div className="text-emerald-100 opacity-80">
                      {t('cta.stats.growth.label')}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 relative h-64 bg-gradient-to-br from-white/[0.08] to-transparent rounded-xl overflow-hidden group hover:from-white/[0.12] transition-colors border border-white/10">
                  <div className="absolute bottom-0 left-0 w-full h-48 flex items-end px-4 pb-4">
                    <div className="w-1/4 bg-gradient-to-t from-emerald-500 to-emerald-400 opacity-80 h-[30%] rounded-t-md transition-all duration-500 group-hover:h-[40%]"></div>
                    <div className="w-1/4 bg-gradient-to-t from-emerald-500 to-emerald-400 opacity-80 h-[45%] rounded-t-md transition-all duration-500 group-hover:h-[55%]"></div>
                    <div className="w-1/4 bg-gradient-to-t from-emerald-500 to-emerald-400 opacity-80 h-[65%] rounded-t-md transition-all duration-500 group-hover:h-[75%]"></div>
                    <div className="w-1/4 bg-gradient-to-t from-emerald-500 to-emerald-400 opacity-80 h-[85%] rounded-t-md transition-all duration-500 group-hover:h-[95%]"></div>
                  </div>
                  
                  <div className="absolute top-4 left-4 text-white font-medium opacity-90">
                    {t('features.title')} - {t('sellerBenefits.title')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* RedirectModal */}
      <RedirectModal
        isOpen={isRedirectModalOpen}
        onClose={handleClose}
        title={t('common.redirecting')}
        error={error}
      />
    </section>
  );
};

export default CTA; 