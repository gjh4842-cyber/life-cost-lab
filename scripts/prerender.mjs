/**
 * Vite 빌드 결과를 경량 정적 HTML로 사전 렌더링합니다. 검색엔진은 주요 글·카테고리 본문을 자바스크립트 실행 전에도 읽을 수 있습니다.
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const outputDir = resolve(root, "dist/public");
const content = readFileSync(resolve(root, "client/src/data/content.ts"), "utf8");
const config = readFileSync(resolve(root, "client/src/data/siteConfig.ts"), "utf8");
const configuredDomain = config.match(/domain:\s*["']([^"']+)["']/)?.[1]?.trim();
const productionOrigin = (configuredDomain || "https://example.com").replace(/\/$/, "");
const categoriesBlock = content.match(/export const categories[\s\S]*?\];\n\nexport const articles/)?.[0] ?? "";
const articlesBlock = content.match(/export const articles[\s\S]*?\];\n\nexport const getCategory/)?.[0] ?? "";
const categorySlugs = [...categoriesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const articleSlugs = [...articlesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = ["/", "/articles", "/calculators", "/about", "/contact", "/privacy", "/disclaimer", "/search", "/404", ...categorySlugs.map((slug) => `/category/${slug}`), ...articleSlugs.map((slug) => `/articles/${slug}`)];
const port = "4173";
const viteBin = resolve(root, "node_modules/.bin/vite");
if (!existsSync(viteBin)) throw new Error("Vite 실행 파일을 찾지 못했습니다.");
const server = spawn(viteBin, ["preview", "--host", "127.0.0.1", "--port", port, "--strictPort"], { cwd: root, stdio: "ignore" });
const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
async function waitForServer() { for (let attempt = 0; attempt < 25; attempt += 1) { try { const response = await fetch(`http://127.0.0.1:${port}/`); if (response.ok) return; } catch { /* server startup */ } await sleep(160); } throw new Error("사전 렌더링 서버가 시작되지 않았습니다."); }
function outputPath(route) { if (route === "/") return resolve(outputDir, "index.html"); if (route === "/404") return resolve(outputDir, "404.html"); return resolve(outputDir, route.replace(/^\//, ""), "index.html"); }
try {
  await waitForServer();
  for (const route of routes) {
    const html = execFileSync("/usr/bin/chromium", ["--headless=new", "--disable-gpu", "--no-sandbox", "--virtual-time-budget=1300", "--dump-dom", `http://127.0.0.1:${port}${route}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
    const rendered = `<!doctype html>\n${html.replaceAll(`http://127.0.0.1:${port}`, productionOrigin)}`;
    const destination = outputPath(route);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, rendered, "utf8");
  }
  console.log(`Prerendered ${routes.length} content routes.`);
} finally { server.kill("SIGTERM"); }
