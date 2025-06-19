import React from 'react';

interface FlagIconProps {
  className?: string;
  size?: number;
}

// 美国国旗
export function USFlag({ className = '', size = 20 }: FlagIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#B22234" />
      <rect width="24" height="1.85" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="3.69" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="7.38" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="11.08" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="14.77" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="18.46" fill="#FFFFFF" />
      <rect width="24" height="1.85" y="22.15" fill="#FFFFFF" />
      <rect width="9.6" height="12.92" fill="#3C3B6E" />
    </svg>
  );
}

// 中国国旗
export function CNFlag({ className = '', size = 20 }: FlagIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#DE2910" />
      <polygon 
        points="4,4 6,7 3.5,8.5 5.5,8.5 4,11" 
        fill="#FFDE00" 
      />
      <polygon 
        points="8,3 8.5,4 9.5,3.5 9,4.5 10,5" 
        fill="#FFDE00" 
        transform="scale(0.6)"
      />
      <polygon 
        points="10,6 10.5,7 11.5,6.5 11,7.5 12,8" 
        fill="#FFDE00" 
        transform="scale(0.6)"
      />
      <polygon 
        points="10,9 10.5,10 11.5,9.5 11,10.5 12,11" 
        fill="#FFDE00" 
        transform="scale(0.6)"
      />
      <polygon 
        points="8,11 8.5,12 9.5,11.5 9,12.5 10,13" 
        fill="#FFDE00" 
        transform="scale(0.6)"
      />
    </svg>
  );
}

// 日本国旗
export function JPFlag({ className = '', size = 20 }: FlagIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="4.8" fill="#BC002D" />
    </svg>
  );
}

// 韩国国旗
export function KRFlag({ className = '', size = 20 }: FlagIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#FFFFFF" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="#CD2E3A" strokeWidth="0.8" />
      <path d="M12 8.4 A3.6 3.6 0 0 1 12 15.6 A1.8 1.8 0 0 0 12 8.4" fill="#0047A0" />
      <path d="M12 8.4 A3.6 3.6 0 0 0 12 15.6 A1.8 1.8 0 0 1 12 8.4" fill="#CD2E3A" />
      <g stroke="#000000" strokeWidth="0.3">
        <line x1="16.5" y1="6" x2="19" y2="6" />
        <line x1="16.5" y1="7" x2="19" y2="7" />
        <line x1="16.5" y1="8" x2="18" y2="8" />
      </g>
    </svg>
  );
}

// 泰国国旗
export function THFlag({ className = '', size = 20 }: FlagIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" rx="2" fill="#FFFFFF" />
      <rect width="24" height="3.43" fill="#A51931" />
      <rect width="24" height="3.43" y="3.43" fill="#FFFFFF" />
      <rect width="24" height="6.86" y="6.86" fill="#6B9BD3" />
      <rect width="24" height="3.43" y="13.71" fill="#FFFFFF" />
      <rect width="24" height="3.43" y="17.14" fill="#A51931" />
    </svg>
  );
}

// 国旗图标映射
const flagIcons = {
  en: USFlag,
  zh: CNFlag,
  ja: JPFlag,
  ko: KRFlag,
  th: THFlag,
} as const;

interface FlagIconComponentProps extends FlagIconProps {
  locale: string;
}

export function FlagIcon({ locale, className = '', size = 20 }: FlagIconComponentProps) {
  const IconComponent = flagIcons[locale as keyof typeof flagIcons];
  
  if (!IconComponent) {
    // 如果没有对应的图标，显示地球图标
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  
  return <IconComponent className={className} size={size} />;
} 