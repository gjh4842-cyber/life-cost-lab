import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(process.cwd(), "dist", "public");
const failures = [];
const htmlFiles = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
}

if (!existsSync(root)) {
  console.error("Build audit failed: dist/public does not exist. Run pnpm run build:cloudflare first.");
  process.exit(1);
}

walk(root);

const fileForPath = (pathname) => {
  const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!clean) return "index.html";
  if (clean === "404") return "404.html";
  if (existsSync(join(root, clean))) return clean;
  return join(clean, "index.html");
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const label = `/${relative(root, file)}`;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]?.trim();
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]?.trim();
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) failures.push(`${label}: missing title`);
  if (!description) failures.push(`${label}: missing meta description`);
  if (!canonical) failures.push(`${label}: missing canonical`);
  if (h1Count !== 1) failures.push(`${label}: expected 1 h1, found ${h1Count}`);

  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^[a-z][a-z\d+.-]*:/i.test(href)) continue;
    const pathname = new URL(href, "https://audit.invalid").pathname;
    const target = join(root, fileForPath(pathname));
    if (!existsSync(target)) failures.push(`${label}: broken internal link ${href}`);
  }
}

for (const required of ["robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(root, required))) failures.push(`missing ${required}`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!/^Sitemap:\s*https:\/\//m.test(robots)) failures.push("robots.txt: missing absolute Sitemap directive");

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
for (const pathname of sitemapUrls) {
  if (!existsSync(join(root, fileForPath(pathname)))) failures.push(`sitemap.xml: route not prerendered ${pathname}`);
}

if (failures.length > 0) {
  console.error(`Build audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Build audit passed: ${htmlFiles.length} HTML pages, ${sitemapUrls.length} sitemap URLs, no broken internal links.`);
