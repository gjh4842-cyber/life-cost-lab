/**
 * Design note — 여백의 생활편집실: 운영 설정도 콘텐츠와 분리해, 사이트 신뢰 정보가 한 곳에서 일관되게 관리되게 한다.
 * 배포 전 실제 운영 정보로 반드시 변경하세요.
 */
export const siteConfig = {
  siteName: "한결생활 가이드",
  domain: "",
  contactEmail: "",
  operatorName: "",
  privacyEffectiveDate: "2026. 08. 27.",
};

export const isLaunchReady = Boolean(siteConfig.domain && siteConfig.contactEmail && siteConfig.operatorName);
