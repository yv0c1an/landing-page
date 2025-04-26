import { useState, useEffect } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { useTranslations } from 'next-intl';

export function CookieConsentBanner() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  // 避免服务器端渲染问题
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('cookies.accept')}
      declineButtonText={t('cookies.decline')}
      cookieName="myApp-cookieConsent"
      style={{ background: "#0F172A", zIndex: 9999 }}
      buttonStyle={{ 
        backgroundColor: "#3B82F6", 
        color: "white", 
        fontSize: "14px", 
        borderRadius: "4px", 
        padding: "8px 16px" 
      }}
      declineButtonStyle={{
        backgroundColor: "transparent",
        border: "1px solid #9CA3AF",
        color: "white",
        fontSize: "14px",
        borderRadius: "4px",
        padding: "8px 16px"
      }}
      enableDeclineButton
      expires={150}
    >
      {t('cookies.message')}
    </CookieConsent>
  );
} 