# 한결생활 가이드

40~60대까지 편하게 읽을 수 있도록 구성한 반응형 생활 정보 웹사이트입니다. 콘텐츠는 `client/src/data/content.ts`의 구조화된 데이터로 관리하며, 향후 CMS 또는 데이터베이스로 이전하기 쉬운 형태를 유지합니다.

## 콘텐츠 추가

`client/src/data/content.ts`의 `articles` 배열에 글 객체를 추가합니다. `slug`는 영문 URL 주소로, 게시 후에는 바꾸지 않는 것을 권장합니다. `category`, `title`, `excerpt`, `publishedAt`, `reviewedAt`, `sections`를 반드시 작성합니다. 새 카테고리는 `categories`에도 추가한 뒤 사이트맵 주소를 보완합니다.

## Cloudflare Pages 배포

1. 소스 코드를 GitHub 저장소에 올립니다.
2. Cloudflare Dashboard의 **Workers & Pages → Create application → Pages → Connect to Git**에서 저장소를 연결합니다.
3. 빌드 명령은 `pnpm build:cloudflare`, 출력 디렉터리는 `dist/public`로 설정합니다.
4. Cloudflare Pages의 **Custom domains**에서 개인 도메인을 연결합니다.
5. 실제 도메인이 정해지면 `client/public/robots.txt`와 `client/public/sitemap.xml`의 `https://example.com`을 실제 도메인으로 바꾸고 재배포합니다.

## Search Console 및 AdSense 준비

| 항목 | 준비된 기반 | 배포 전 운영 작업 |
|---|---|---|
| Google Search Console | `robots.txt`, `sitemap.xml`, 제목·설명·canonical, 내부 연결 | 실제 도메인으로 변경 후 소유권 확인 및 사이트맵 제출 |
| Google AdSense | 사이트 소개·운영 원칙·개인정보 안내, 콘텐츠 우선 레이아웃, `ads.txt` 자리 | 실제 운영자 연락처 기입, 승인 후 발급 ID로 `ads.txt` 교체 |
| SEO | 명확한 URL, 제목 계층, 게시일·검토일, 관련 글 | 각 글마다 고유한 제목·요약·신뢰 가능한 출처 점검 |

> `example.com`, 문의 이메일, AdSense 게시자 ID는 반드시 실제 정보로 바꾼 뒤 배포하세요. 건강·법률·금융 등 중요한 주제는 공신력 있는 최신 출처와 전문가 검토 절차를 함께 운영해야 합니다.

## 필수 운영 페이지 설정

사이트 소개(`/about`), 문의(`/contact`), 개인정보처리방침(`/privacy`), 면책 안내(`/disclaimer`), 404 페이지를 독립적으로 제공합니다. 배포 전에 `client/src/data/siteConfig.ts`의 `domain`, `contactEmail`, `operatorName`을 실제 정보로 교체하세요. 문의 페이지는 운영 이메일이 등록된 경우에만 이메일 작성 버튼을 노출합니다.

콘텐츠를 추가할 때에는 해당 글의 분야, 발행일, 최종 검토일, 설명, 본문 섹션을 `client/src/data/content.ts`에 함께 기록합니다. 법·건강·금융·세무·주거처럼 개인별 판단이 중요한 글은 공식 출처의 최신 기준을 연결하고, 면책 안내의 적용 범위를 벗어나는 개별 결론을 제공하지 않도록 운영하는 것이 좋습니다.

## 검색엔진·분석·광고 설정

빌드 명령 `pnpm build:cloudflare`는 게시글·카테고리 데이터에 맞춰 XML Sitemap과 각 콘텐츠 경로의 정적 HTML을 생성합니다. 따라서 주요 본문, 제목, 메타 설명, canonical URL, Open Graph, Breadcrumb 및 글 구조화 데이터가 검색엔진에 바로 제공됩니다. Cloudflare Pages에서는 `_redirects` 대신 생성된 정적 경로를 사용하므로, 존재하지 않는 주소는 `404.html`을 반환합니다.

Google Search Console 등록 전에는 `siteConfig.ts`의 `domain`을 실제 HTTPS 도메인으로 입력한 뒤 재빌드하고, 사이트맵을 제출하세요. 실제 도메인이 비어 있는 상태에서는 잘못된 URL을 만들지 않도록 정적 canonical·구조화 데이터와 Sitemap URL 목록을 생성하지 않습니다. Google Analytics와 Google AdSense를 사용하기로 한 경우에만 같은 파일의 `googleAnalyticsId`, `adsenseClient`에 발급받은 실제 ID를 입력합니다. 값이 비어 있으면 외부 계측·광고 스크립트는 불러오지 않습니다. 빌드 과정은 `robots.txt`, `sitemap.xml`, `ads.txt`도 실제 설정에 맞춰 자동 생성합니다. 자세한 글 추가 절차는 `CONTENT_PUBLISHING.md`에 정리했습니다.
