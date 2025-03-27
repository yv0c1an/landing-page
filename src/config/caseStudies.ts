interface CaseContent {
  zh: {
    description: string;
    industry: string;
    location: string;
    challenges: string[];
    solutions: string[];
    results: {
      growth: string;
      revenue: string;
      customers: string;
    };
  };
  en: {
    description: string;
    industry: string;
    location: string;
    challenges: string[];
    solutions: string[];
    results: {
      growth: string;
      revenue: string;
      customers: string;
    };
  };
}

export interface CaseData {
  name: string;
  content: CaseContent;
  year: string;
  quarterlyData: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
}

export const caseStudiesData: CaseData[] = [
  {
    name: "Velora Fashion",
    content: {
      zh: {
        description: "国际女装品牌在跨境电商平台的成功转型",
        industry: "时尚服装",
        location: "法国",
        challenges: [
          "国际市场拓展困难",
          "物流配送时间长",
          "本地化营销挑战"
        ],
        solutions: [
          "智能市场分析和定位",
          "优化全球供应链",
          "多语言本地化营销策略"
        ],
        results: {
          growth: "300%",
          revenue: "250万美元",
          customers: "18个国家"
        }
      },
      en: {
        description: "Successful transformation of an international women's clothing brand on a cross-border e-commerce platform",
        industry: "Fashion",
        location: "France",
        challenges: [
          "Difficulties in international market expansion",
          "Long logistics delivery times",
          "Localization marketing challenges"
        ],
        solutions: [
          "Intelligent market analysis and positioning",
          "Optimization of global supply chain",
          "Multi-language localized marketing strategies"
        ],
        results: {
          growth: "300%",
          revenue: "$2.5M",
          customers: "18 countries"
        }
      }
    },
    year: "2023",
    quarterlyData: {
      q1: 30,
      q2: 55,
      q3: 65,
      q4: 85
    }
  },
  {
    name: "Solara Living",
    content: {
      zh: {
        description: "高端家居品牌的跨境电商增长策略",
        industry: "家居装饰",
        location: "瑞典",
        challenges: [
          "产品价格高，市场接受度低",
          "国际运输成本高",
          "缺乏有效的品牌传播"
        ],
        solutions: [
          "价值定位和差异化策略",
          "区域仓储优化配送",
          "KOL合作和社交媒体营销"
        ],
        results: {
          growth: "215%",
          revenue: "180万美元",
          customers: "12个国家"
        }
      },
      en: {
        description: "Cross-border e-commerce growth strategy for a high-end home brand",
        industry: "Home Decor",
        location: "Sweden",
        challenges: [
          "High product prices with low market acceptance",
          "High international shipping costs",
          "Lack of effective brand communication"
        ],
        solutions: [
          "Value positioning and differentiation strategy",
          "Regional warehouse optimization for distribution",
          "KOL partnerships and social media marketing"
        ],
        results: {
          growth: "215%",
          revenue: "$1.8M",
          customers: "12 countries"
        }
      }
    },
    year: "2022",
    quarterlyData: {
      q1: 25,
      q2: 45,
      q3: 60,
      q4: 75
    }
  },
  {
    name: "Innovora Tech",
    content: {
      zh: {
        description: "电子产品品牌的全球市场扩张",
        industry: "消费电子",
        location: "台湾",
        challenges: [
          "激烈的市场竞争",
          "消费者教育和信任建立",
          "售后服务的国际化"
        ],
        solutions: [
          "产品差异化和独特定位",
          "详细的产品内容和视频展示",
          "全球化客服和技术支持"
        ],
        results: {
          growth: "180%",
          revenue: "320万美元",
          customers: "22个国家"
        }
      },
      en: {
        description: "Global market expansion of an electronics product brand",
        industry: "Consumer Electronics",
        location: "Taiwan",
        challenges: [
          "Intense market competition",
          "Consumer education and trust building",
          "Internationalization of after-sales service"
        ],
        solutions: [
          "Product differentiation and unique positioning",
          "Detailed product content and video presentations",
          "Globalized customer service and technical support"
        ],
        results: {
          growth: "180%",
          revenue: "$3.2M",
          customers: "22 countries"
        }
      }
    },
    year: "2023",
    quarterlyData: {
      q1: 20,
      q2: 40,
      q3: 70,
      q4: 90
    }
  }
]; 