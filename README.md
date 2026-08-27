# 생활비랩

**대한민국 생활비 절약 및 생활정보**를 다루는 반응형 정보 웹사이트입니다. 생활에 필요한 비용을 알아보고, 비교하고, 절약하는 데 필요한 실용적인 정보를 제공하며 40~60대도 편하게 읽을 수 있도록 큰 글자와 넉넉한 행간을 사용합니다.

콘텐츠는 `client/src/data/content.ts`의 구조화된 데이터로 관리합니다. 현재 카테고리는 `생활비·절약`, `정부지원·복지`, `자동차`, `주거·가전`, `여행·여가`, `생활 계산기` 여섯 가지이며, 향후 CMS나 데이터베이스로 옮기기 쉬운 형태를 유지합니다.

## 콘텐츠와 계산기 추가

새 글은 `articles` 배열에 추가합니다. `slug`, `category`, `title`, `excerpt`, `tags`, `searchTerms`, `publishedAt`, `reviewedAt`, `sections`를 작성하면 글 목록, 카테고리, 검색, 관련글, 메타데이터에 함께 반영됩니다. 확인한 실제 공식 자료가 있다면 `sources`와 검토일도 추가합니다.

새 계산기는 `client/src/data/calculators.ts`에 추가합니다. 계산기마다 독립 URL, 목록 카드, 결과 안내, Sitemap과 정적 HTML이 자동 생성됩니다. 상세 작성 규칙은 [CONTENT_PUBLISHING.md](./CONTENT_PUBLISHING.md)를 참고하세요.

## Cloudflare Pages 배포

1. 변경 사항을 GitHub 저장소 `gjh4842-cyber/life-cost-lab`의 `main` 브랜치에 올립니다.
2. Cloudflare Dashboard에서 **Workers & Pages → Create application → Pages → Connect to Git**을 선택합니다.
3. 저장소를 연결하고, Production branch는 `main`, Build command는 `pnpm build:cloudflare`, Build output directory는 `dist/public`으로 설정합니다.
4. 새 `pages.dev` 주소에서 메뉴·글·계산기·404가 정상인지 확인한 뒤 **Custom domains**에서 대표 도메인을 연결합니다.
5. 기존 Direct Upload 프로젝트는 새 Git 연동 프로젝트의 정상 동작을 확인할 때까지 유지합니다.

현재 대표 도메인은 `https://xn--v69a23sc9g7wd.kr`이며, `client/src/data/siteConfig.ts`에 설정되어 있습니다. URL을 변경해야 할 때에는 이 파일의 `domain` 하나를 수정한 뒤 `pnpm build:cloudflare`를 다시 실행하세요. 빌드가 `dist/public`에 `sitemap.xml`, `robots.txt`, `ads.txt`, 모든 공개 경로의 정적 HTML을 새로 생성합니다.

## Search Console·분석·광고 설정

| 항목 | 현재 기반 | 운영자가 할 일 |
|---|---|---|
| Google Search Console | XML Sitemap, robots, canonical, 정적 본문, 구조화 데이터, 내부링크 | 도메인 소유권을 확인하고 `https://xn--v69a23sc9g7wd.kr/sitemap.xml`을 제출 |
| Google Analytics | `siteConfig.ts`의 선택형 코드 삽입 구조 | 실제 측정 ID가 있을 때만 `googleAnalyticsId` 입력 |
| Google AdSense | 콘텐츠 중심 레이아웃, 운영·정책 페이지, 선택형 `ads.txt` | 승인 후 실제 게시자 ID를 `adsenseClient`에 입력하고 개인정보처리방침도 갱신 |
| SEO | 고유 제목·설명·H1~H3·OG·Breadcrumb·Article JSON-LD | 모든 글의 제목·요약·최종 검토일·근거 자료를 점검 |

> 광고 승인이나 검색 노출은 보장되지 않습니다. 실제 운영 내용, 정책 준수, 콘텐츠 품질과 최신성은 운영자가 지속적으로 관리해야 합니다.

## 운영 설정과 안내 페이지

`siteConfig.ts`의 `contactEmail`은 비어 있는 상태입니다. 실제 문의용 이메일을 준비한 뒤 그 한 곳에만 입력하면 문의 화면에 이메일 작성 버튼이 나타납니다. Google Analytics나 Google AdSense도 실제 값이 입력된 경우에만 외부 스크립트를 불러옵니다.

사이트는 소개(`/about`), 문의(`/contact`), 개인정보처리방침(`/privacy`), 이용약관(`/terms`), 면책 안내(`/disclaimer`), 404 페이지를 제공합니다. 개인정보처리방침은 실제 사용 중인 이메일, 분석, 광고 서비스에 맞춰 배포 전에 다시 검토하세요.
