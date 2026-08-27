export type Category = { slug: string; name: string; shortName: string; description: string; accent: string; icon: "wallet" | "heart" | "smartphone" | "house" };
export type ArticleSection = { heading: string; paragraphs: string[]; points?: string[] };
export type Article = { slug: string; category: string; title: string; excerpt: string; publishedAt: string; reviewedAt: string; readTime: string; featured?: boolean; sections: ArticleSection[] };

export const categories: Category[] = [
  { slug: "money", name: "돈·혜택", shortName: "돈·혜택", description: "지원 제도, 생활비, 연금처럼 생활에 바로 닿는 기준을 차분히 정리합니다.", accent: "terracotta", icon: "wallet" },
  { slug: "health", name: "건강·돌봄", shortName: "건강·돌봄", description: "검진 준비와 일상 관리, 돌봄을 위한 확인 순서를 함께 살펴봅니다.", accent: "olive", icon: "heart" },
  { slug: "digital", name: "일상·디지털", shortName: "일상·디지털", description: "휴대폰과 온라인 서비스에서 필요한 기능을 쉬운 말로 안내합니다.", accent: "blue", icon: "smartphone" },
  { slug: "home", name: "주거·안전", shortName: "주거·안전", description: "집과 계약, 생활 안전에서 확인해야 할 기본 기준을 모았습니다.", accent: "gold", icon: "house" },
];

export const articles: Article[] = [
  { slug: "before-you-apply-benefits", category: "money", title: "지원 제도 신청 전, 먼저 확인할 5가지", excerpt: "내가 받을 수 있는지부터 서류 제출 순서까지, 신청 전에 놓치기 쉬운 기준을 차례대로 정리했습니다.", publishedAt: "2026. 08. 25.", reviewedAt: "2026. 08. 25.", readTime: "4분 읽기", featured: true, sections: [
    { heading: "먼저 ‘대상’과 ‘기준일’을 분리해 보세요", paragraphs: ["지원 제도는 나이나 소득처럼 대상이 되는 조건과, 언제의 정보를 기준으로 보는지를 함께 확인해야 합니다. 안내문을 읽을 때는 ‘누가’와 ‘언제’를 먼저 표시해 두면 훨씬 이해하기 쉽습니다.", "가구 구성, 거주 지역, 신청 시점에 따라 결과가 달라질 수 있습니다. 한 곳의 짧은 요약만 보고 판단하기보다, 신청하려는 기관의 최신 공고를 마지막에 한 번 더 확인하세요."], points: ["대상 조건: 나이·가구·소득·재산 기준", "기준일: 신청일·공고일·전년도 자료 중 무엇인지", "확인처: 공식 공고문과 담당 기관 문의처"] },
    { heading: "서류는 ‘발급 가능 여부’까지 점검합니다", paragraphs: ["제출 서류 목록만 적어 두는 것보다, 각 서류를 어디서 어떤 방식으로 발급하는지도 함께 정리해 두는 편이 좋습니다. 온라인 발급이 익숙하지 않다면 가족이나 가까운 행정복지센터에 도움을 요청할 수 있습니다.", "서류의 유효 기간이나 원본 여부가 필요한지도 확인하세요. 같은 서류라도 발급 시점이 너무 오래되면 다시 준비해야 할 수 있습니다."] },
    { heading: "신청 뒤에는 결과 확인 일정을 남겨 두세요", paragraphs: ["신청을 마쳤다면 접수 번호, 제출한 날짜, 결과 확인 방법을 메모합니다. 추가 보완 요청은 전화나 문자로 올 수 있으므로, 연락처가 정확히 등록되어 있는지도 살펴보세요.", "이 글은 신청 준비를 위한 일반적인 순서를 안내합니다. 실제 자격과 지급 여부는 각 제도의 최신 안내와 심사를 기준으로 결정됩니다."] },
  ] },
  { slug: "health-checkup-preparation", category: "health", title: "건강검진 전날, 준비 사항을 한 장으로 정리하는 법", excerpt: "검진 전날부터 당일 아침까지 헷갈리기 쉬운 준비를 체크 순서로 정리했습니다.", publishedAt: "2026. 08. 21.", reviewedAt: "2026. 08. 22.", readTime: "3분 읽기", featured: true, sections: [
    { heading: "검진 기관에서 받은 안내문을 기준으로 합니다", paragraphs: ["검진 준비는 검사 항목에 따라 달라질 수 있으므로, 일반적인 경험보다 예약한 기관의 안내가 우선입니다. 문자나 종이 안내문을 사진으로 저장해 두면 당일에도 다시 확인할 수 있습니다.", "복용 중인 약이나 기존 질환이 있다면 임의로 판단하지 말고, 검진 기관 또는 진료 중인 의료진에게 미리 물어보는 편이 안전합니다."], points: ["검진 시간과 장소 재확인", "금식·복용약 관련 공식 안내 확인", "신분증과 필요한 문진표 준비"] },
    { heading: "당일에는 무리하지 않고 질문을 남깁니다", paragraphs: ["검진 결과를 받을 때 궁금했던 증상이나 생활 습관을 짧게 메모해 가면 상담에 도움이 됩니다. 결과에 대한 해석이나 치료 판단은 의료 전문가와 상의하세요."] },
  ] },
  { slug: "save-photos-on-phone", category: "digital", title: "휴대폰 사진, 잃어버리지 않게 정리하는 가장 쉬운 순서", excerpt: "사진을 지우기 전에 백업 위치를 확인하고 앨범을 정리하는 실용적인 순서를 소개합니다.", publishedAt: "2026. 08. 18.", reviewedAt: "2026. 08. 19.", readTime: "5분 읽기", featured: true, sections: [
    { heading: "정리보다 백업 위치를 먼저 확인하세요", paragraphs: ["사진을 지우기 전에 현재 사진이 휴대폰에만 있는지, 별도의 저장 공간에도 복사되어 있는지 확인합니다. ‘자동 백업’ 표시가 있어도 마지막 동기화 날짜를 살펴보는 습관이 필요합니다.", "백업 방법은 사용하는 휴대폰과 서비스에 따라 다릅니다. 중요한 사진은 한 곳에만 두지 않고, 믿을 수 있는 두 위치에 보관하는 방법을 고려할 수 있습니다."] },
    { heading: "앨범은 날짜보다 ‘용도’로 나누면 편합니다", paragraphs: ["가족, 병원 서류, 영수증, 여행처럼 자주 찾는 용도로 앨범을 나누면 나중에 검색하기 쉽습니다. 한 번에 모두 정리하려 하기보다 이번 달 사진부터 시작해도 충분합니다."], points: ["중요 서류 사진은 별도 앨범", "중복 사진은 백업 확인 후 정리", "비밀번호와 복구 방법은 종이에 안전하게 기록"] },
  ] },
  { slug: "rental-contract-checklist", category: "home", title: "임대차 계약서에 서명하기 전, 체크할 기본 항목", excerpt: "계약 당사자와 주소, 특약처럼 계약 전 확인이 필요한 항목을 차례로 살펴봅니다.", publishedAt: "2026. 08. 14.", reviewedAt: "2026. 08. 16.", readTime: "6분 읽기", sections: [
    { heading: "계약서는 ‘사람·집·금액’부터 맞춰 봅니다", paragraphs: ["계약서에 적힌 임대인과 실제 권리 관계, 주택의 주소와 호수, 보증금과 차임의 숫자를 원본 서류와 대조합니다. 사소해 보이는 표기 차이도 계약 전에는 확인하는 편이 좋습니다.", "이 글은 일반적인 체크 순서를 안내하며, 구체적인 계약 판단은 공인중개사·법률 전문가 또는 관련 공공 상담 창구에 확인하는 것이 안전합니다."] },
    { heading: "특약은 말이 아닌 문장으로 남깁니다", paragraphs: ["수리, 입주일, 시설물 상태처럼 합의한 내용은 구두 약속으로만 두지 말고 계약서에 구체적으로 적어야 합니다. 이해되지 않는 문장은 그 자리에서 설명을 듣고 확인하세요."] },
  ] },
  { slug: "reduce-household-fixed-costs", category: "money", title: "매달 나가는 고정비, 부담 없이 점검하는 방법", excerpt: "통신비·보험료·구독 서비스처럼 매달 자동으로 나가는 항목을 한 번에 점검해 보세요.", publishedAt: "2026. 08. 09.", reviewedAt: "2026. 08. 10.", readTime: "4분 읽기", sections: [
    { heading: "최근 한 달의 내역을 한곳에 모읍니다", paragraphs: ["고정비를 줄이려면 먼저 무엇이 나가고 있는지 정확히 알아야 합니다. 통장 거래내역이나 카드 명세서에서 반복되는 결제 항목만 표시해 보세요.", "바로 해지하기보다 계약 기간, 해지 수수료, 꼭 필요한 서비스인지를 순서대로 확인하면 실수를 줄일 수 있습니다."] },
    { heading: "변경 전후를 한 달 동안 비교합니다", paragraphs: ["한 번에 여러 항목을 바꾸면 무엇이 달라졌는지 파악하기 어렵습니다. 한두 가지부터 바꾸고 다음 달 내역을 비교해 보는 방식이 현실적입니다."] },
  ] },
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
export const getArticlesByCategory = (slug: string) => articles.filter((article) => article.category === slug);
