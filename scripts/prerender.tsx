/**
 * React 서버 렌더링으로 콘텐츠 경로별 정적 HTML을 만듭니다.
 * 브라우저 실행 파일 없이 Cloudflare Pages의 Linux 빌드 환경에서 실행됩니다.
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import StaticApp from "../client/src/StaticApp";
import { articles, categories, totalArticlePages } from "../client/src/data/content";
import { calculators } from "../client/src/data/calculators";
import { siteConfig } from "../client/src/data/siteConfig";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "dist/public");
const template = readFileSync(resolve(outputDir, "index.html"), "utf8");
const siteName = siteConfig.siteName;
const siteOrigin = siteConfig.domain.replace(/\/$/, "");
const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const isoDate = (value: string) => value.replace(/\.\s*/g, "-").replace(/-$/, "");

type PageMeta = { title: string; description: string; type: "website" | "article"; schema?: Record<string, unknown>; breadcrumbs?: { label: string; href?: string }[] };
function metaFor(pathname: string): PageMeta {
  const article = articles.find((item) => pathname === `/articles/${item.slug}`);
  if (article) { const category = categories.find((item) => item.slug === article.category); return { title: article.title, description: article.excerpt, type: "article", breadcrumbs: [{ label: "홈", href: "/" }, { label: category?.name ?? "카테고리", href: `/category/${article.category}` }, { label: article.title }], schema: { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: isoDate(article.publishedAt), dateModified: isoDate(article.reviewedAt), author: { "@type": "Organization", name: siteName }, publisher: { "@type": "Organization", name: siteName }, articleSection: category?.name, inLanguage: "ko-KR" } }; }
  const category = categories.find((item) => pathname === `/category/${item.slug}`);
  if (category) return { title: `${category.name} 정보`, description: category.description, type: "website", breadcrumbs: [{ label: "홈", href: "/" }, { label: category.name }] };
  const calculator = calculators.find((item) => pathname === `/calculators/${item.slug}`);
  if (calculator) return { title: calculator.name, description: calculator.description, type: "website", breadcrumbs: [{ label: "홈", href: "/" }, { label: "생활 계산기", href: "/calculators" }, { label: calculator.name }] };
  const defaults: Record<string, Omit<PageMeta, "type">> = { "/": { title: "생활비 절약 및 생활정보", description: "생활에 필요한 비용을 알아보고, 비교하고, 절약하는 데 필요한 실용적인 정보를 제공합니다." }, "/articles": { title: "생활정보 전체 글", description: "생활비 절약, 정부지원·복지, 자동차, 주거·가전, 여행·여가의 실용 정보를 확인하세요." }, "/search": { title: "생활정보 검색", description: "생활비, 정부지원, 자동차, 주거·가전, 여행 관련 실용 정보를 검색하세요." }, "/calculators": { title: "생활 계산기", description: "월 생활비, 자동차 유지비, 여행비, 고정지출, 절약금액을 입력값 기준으로 계산합니다." }, "/about": { title: "사이트 소개와 운영 원칙", description: "생활비랩은 대한민국 생활비 절약 및 생활정보를 실용적으로 정리하는 콘텐츠 사이트입니다." }, "/contact": { title: "문의하기", description: "생활비랩의 콘텐츠 정정과 이용 문의를 위한 안내입니다." }, "/privacy": { title: "개인정보처리방침", description: "생활비랩의 개인정보 처리 기준과 이용자 권리 안내입니다." }, "/terms": { title: "이용약관", description: "생활비랩의 콘텐츠 이용 범위와 운영 기준을 안내합니다." }, "/disclaimer": { title: "면책 안내", description: "생활비랩에서 제공하는 생활비·생활 정보의 이용 범위와 확인이 필요한 사항을 안내합니다." }, "/404": { title: "페이지를 찾을 수 없습니다", description: "요청하신 페이지를 찾을 수 없습니다. 생활비랩에서 필요한 정보를 다시 찾아보세요." } };
  const current = defaults[pathname] ?? defaults["/404"];
  return { ...current, type: "website", breadcrumbs: pathname === "/" ? undefined : [{ label: "홈", href: "/" }, { label: current.title }] };
}
function outputPath(pathname: string) { if (pathname === "/") return resolve(outputDir, "index.html"); if (pathname === "/404") return resolve(outputDir, "404.html"); return resolve(outputDir, pathname.replace(/^\//, ""), "index.html"); }
function renderRoute(pathname: string) { return renderToStaticMarkup(<Router ssrPath={pathname}><StaticApp /></Router>); }
function withMeta(html: string, pathname: string, meta: PageMeta) {
  const fullTitle = `${meta.title} | ${siteName}`; const description = escapeHtml(meta.description); const canonical = siteOrigin ? `${siteOrigin}${pathname}` : "";
  let document = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`).replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`).replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`).replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" />`);
  const tags = [`<meta property="og:type" content="${meta.type}" />`, `<meta property="og:locale" content="ko_KR" />`];
  if (canonical) { tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`, `<meta property="og:url" content="${escapeHtml(canonical)}" />`); const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: `${siteOrigin}/`, description: meta.description, inLanguage: "ko-KR", potentialAction: { "@type": "SearchAction", target: `${siteOrigin}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } }; tags.push(`<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`); if (meta.breadcrumbs) { const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: meta.breadcrumbs.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: `${siteOrigin}${item.href}` } : {}) })) }; tags.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>`); } if (meta.schema) tags.push(`<script type="application/ld+json">${JSON.stringify({ ...meta.schema, mainEntityOfPage: { "@type": "WebPage", "@id": canonical } })}</script>`); }
  return document.replace("</head>", `${tags.join("\n    ")}\n  </head>`);
}
const routes = ["/", "/articles", ...Array.from({ length: Math.max(0, totalArticlePages - 1) }, (_, index) => `/articles/page/${index + 2}`), "/search", "/calculators", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/404", ...categories.map((category) => `/category/${category.slug}`), ...articles.map((article) => `/articles/${article.slug}`), ...calculators.map((calculator) => `/calculators/${calculator.slug}`)];
for (const pathname of routes) { const body = renderRoute(pathname); const document = withMeta(template.replace("<div id=\"root\"></div>", `<div id="root">${body}</div>`), pathname, metaFor(pathname)); const destination = outputPath(pathname); mkdirSync(dirname(destination), { recursive: true }); writeFileSync(destination, document, "utf8"); }
console.log(`Prerendered ${routes.length} content routes without a browser dependency.`);
