/**
 * 정적 콘텐츠 데이터에서 사이트맵을 생성합니다. 새 카테고리·글을 추가한 뒤 빌드하면 주소 목록이 자동 갱신됩니다.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const content = readFileSync(resolve(root, "client/src/data/content.ts"), "utf8");
const config = readFileSync(resolve(root, "client/src/data/siteConfig.ts"), "utf8");
const configuredDomain = config.match(/domain:\s*["']([^"']+)["']/)?.[1]?.trim();
const adsenseClient = config.match(/adsenseClient:\s*["']([^"']+)["']/)?.[1]?.trim();
const baseUrl = (configuredDomain || "https://example.com").replace(/\/$/, "");
const categoriesBlock = content.match(/export const categories[\s\S]*?\];\n\nexport const articles/)?.[0] ?? "";
const articlesBlock = content.match(/export const articles[\s\S]*?\];\n\nexport const getCategory/)?.[0] ?? "";
const categorySlugs = [...categoriesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const articleEntries = [...articlesBlock.matchAll(/slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"(\d{4})\.\s*(\d{2})\.\s*(\d{2})\./g)].map((match) => ({ slug: match[1], lastmod: `${match[2]}-${match[3]}-${match[4]}` }));
const pages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/articles", changefreq: "weekly", priority: "0.9" },
  ...categorySlugs.map((slug) => ({ path: `/category/${slug}`, changefreq: "weekly", priority: "0.8" })),
  ...articleEntries.map(({ slug, lastmod }) => ({ path: `/articles/${slug}`, changefreq: "monthly", priority: "0.8", lastmod })),
  { path: "/calculators", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.4" },
  { path: "/privacy", changefreq: "monthly", priority: "0.3" },
  { path: "/disclaimer", changefreq: "monthly", priority: "0.3" },
];
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeXml(`${baseUrl}${page.path}`)}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}<changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`).join("\n")}\n</urlset>\n`;
const output = resolve(root, "dist/public/sitemap.xml");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, xml, "utf8");
writeFileSync(resolve(root, "dist/public/robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`, "utf8");
const publisherId = adsenseClient?.replace(/^ca-/, "");
const adsText = publisherId ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n` : "# Google AdSense 승인 후 siteConfig.ts의 adsenseClient에 ca-pub- 형식의 실제 ID를 입력하면 이 파일이 자동 생성됩니다.\n";
writeFileSync(resolve(root, "dist/public/ads.txt"), adsText, "utf8");
console.log(`Generated sitemap with ${pages.length} URLs for ${baseUrl}`);
