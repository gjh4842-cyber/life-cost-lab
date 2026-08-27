/** Design note — 여백의 생활편집실: 모든 화면은 고정 헤더와 넓은 읽기 호흡, 그리고 문서 위치를 알려 주는 보조선을 공유한다. */
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { HeaderSearchBar } from "@/components/HeaderSearchBar";
import { SiteIntegrations } from "@/components/SiteIntegrations";
import { setJsonLd, setPageMeta, SITE_NAME, toAbsoluteUrl } from "@/lib/site";

type PageShellProps = { children: ReactNode; title: string; description: string; path?: string; breadcrumbs?: BreadcrumbItem[] };
export function PageShell({ children, title, description, path = "/", breadcrumbs }: PageShellProps) {
  const currentBreadcrumbs = breadcrumbs ?? (path === "/" ? undefined : [{ label: "홈", href: "/" }, { label: title }]);
  useEffect(() => {
    setPageMeta(title, description, path);
    setJsonLd("website", { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: toAbsoluteUrl("/"), description, potentialAction: { "@type": "SearchAction", target: `${toAbsoluteUrl("/search")}?q={search_term_string}`, "query-input": "required name=search_term_string" } });
    if (currentBreadcrumbs) setJsonLd("breadcrumb", { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: currentBreadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: toAbsoluteUrl(item.href) } : {}) })) });
  }, [title, description, path, currentBreadcrumbs]);
  return <div className="site-frame"><SiteIntegrations /><SiteHeader />{path !== "/search" && <HeaderSearchBar />}{currentBreadcrumbs && <Breadcrumbs items={currentBreadcrumbs} />}<main id="main-content">{children}</main><SiteFooter /></div>;
}
