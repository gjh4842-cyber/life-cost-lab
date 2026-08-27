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
