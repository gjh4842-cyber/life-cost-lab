/**
 * Design note — 여백의 생활편집실: 운영 설정도 콘텐츠와 분리해, 사이트 신뢰 정보가 한 곳에서 일관되게 관리되게 한다.
 * 배포 전 실제 운영 정보로 반드시 변경하세요.
 */
export const siteConfig = {
  siteName: "한결생활 가이드",
  domain: "https://xn--v69a23sc9g7wd.kr",
  contactEmail: "",
  operatorName: "생활비랩",
  // Google Analytics 4 측정 ID 예시: G-XXXXXXXXXX. 비워 두면 관련 스크립트를 불러오지 않습니다.
  googleAnalyticsId: "",
  // Google AdSense 클라이언트 ID 예시: ca-pub-XXXXXXXXXXXXXXXX. 비워 두면 관련 스크립트와 ads.txt가 생성되지 않습니다.
  adsenseClient: "",
  privacyEffectiveDate: "2026. 08. 27.",
};

export const isLaunchReady = Boolean(siteConfig.domain && siteConfig.contactEmail && siteConfig.operatorName);
