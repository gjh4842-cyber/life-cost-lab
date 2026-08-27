/**
 * Design note — 생활비랩: 실제 도메인·운영자·문의 이메일과 외부 서비스 ID는 이 한 파일에서 관리한다.
 * 배포 전 연락 가능한 실제 이메일을 입력하고, 분석·광고 서비스는 실제 사용을 시작할 때만 설정한다.
 */
export const siteConfig = {
  siteName: "생활비랩",
  siteDescription: "대한민국 생활비 절약 및 생활정보",
  brandMessage: "생활에 필요한 비용을 알아보고, 비교하고, 절약하는 데 필요한 실용적인 정보를 제공합니다.",
  domain: "https://xn--v69a23sc9g7wd.kr",
  contactEmail: "",
  operatorName: "생활비랩",
  googleAnalyticsId: "",
  adsenseClient: "",
  privacyEffectiveDate: "2026. 08. 27.",
};

export const isLaunchReady = Boolean(siteConfig.domain && siteConfig.contactEmail && siteConfig.operatorName);
