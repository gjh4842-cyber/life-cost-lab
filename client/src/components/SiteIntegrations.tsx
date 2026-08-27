/**
 * Design note — 여백의 생활편집실: 외부 계측·광고 코드는 운영 설정이 있을 때만 조용히 불러와 본문 읽기 흐름을 침범하지 않는다.
 */
import { useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }

export function SiteIntegrations() {
  useEffect(() => {
    const { googleAnalyticsId, adsenseClient } = siteConfig;
    if (googleAnalyticsId && !document.getElementById("google-analytics-script")) {
      const analytics = document.createElement("script");
      analytics.id = "google-analytics-script";
      analytics.async = true;
      analytics.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`;
      document.head.appendChild(analytics);
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
      window.gtag("js", new Date());
      window.gtag("config", googleAnalyticsId);
    }
    if (adsenseClient && !document.getElementById("adsense-script")) {
      const adsense = document.createElement("script");
      adsense.id = "adsense-script";
      adsense.async = true;
      adsense.crossOrigin = "anonymous";
      adsense.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`;
      document.head.appendChild(adsense);
    }
  }, []);
  return null;
}
