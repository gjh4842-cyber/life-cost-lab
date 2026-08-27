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
import { articles, categories } from "../client/src/data/content";
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
  const defaults: Record<string, Omit<PageMeta, "type">> = { "/": { title: "생활을 정리하는 한결 쉬운 길잡이", description: "생활에 바로 필요한 돈·혜택, 건강·돌봄, 일상·디지털, 주거·안전, 일·경력, 행정·서류 정보를 읽기 쉬운 순서로 안내합니다." }, "/articles": { title: "최신 글", description: "한결생활 가이드에서 새로 정리하고 검토한 생활 정보 글을 확인하세요." }, "/search": { title: "사이트 검색", description: "한결생활 가이드의 생활 정보 글을 검색하세요." }, "/calculators": { title: "생활 계산기", description: "생활비와 고정비처럼 일상 판단에 필요한 간단한 계산 도구를 제공합니다." }, "/about": { title: "사이트 소개와 운영 원칙", description: "한결생활 가이드의 편집 기준과 콘텐츠 운영 원칙을 확인하세요." }, "/contact": { title: "문의 안내", description: "한결생활 가이드의 콘텐츠 정정, 이용 문의, 제휴 요청을 위한 안내입니다." }, "/privacy": { title: "개인정보처리방침", description: "한결생활 가이드의 개인정보 처리 기준과 이용자 권리 안내입니다." }, "/terms": { title: "이용약관", description: "한결생활 가이드의 콘텐츠 이용 범위와 운영 기준을 안내합니다." }, "/disclaimer": { title: "면책 안내", description: "한결생활 가이드에서 제공하는 생활 정보의 이용 범위와 확인이 필요한 사항을 안내합니다." }, "/404": { title: "페이지를 찾을 수 없습니다", description: "요청하신 페이지를 찾을 수 없습니다. 한결생활 가이드에서 필요한 생활 정보를 다시 찾아보세요." } };
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
const routes = ["/", "/articles", "/search", "/calculators", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/404", ...categories.map((category) => `/category/${category.slug}`), ...articles.map((article) => `/articles/${article.slug}`)];
for (const pathname of routes) { const body = renderRoute(pathname); const document = withMeta(template.replace("<div id=\"root\"></div>", `<div id="root">${body}</div>`), pathname, metaFor(pathname)); const destination = outputPath(pathname); mkdirSync(dirname(destination), { recursive: true }); writeFileSync(destination, document, "utf8"); }
console.log(`Prerendered ${routes.length} content routes without a browser dependency.`);
