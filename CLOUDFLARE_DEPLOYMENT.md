# 생활비랩: Cloudflare Pages와 개인 도메인 연결 안내

이 안내는 GitHub와 Cloudflare를 처음 사용하는 운영자를 위한 것입니다. 생활비랩은 정적 사이트이며 `pnpm build:cloudflare`가 `dist/public`에 배포 파일, 글별 HTML, `404.html`, `robots.txt`, `sitemap.xml`, `ads.txt`를 함께 생성합니다.

현재 Cloudflare에는 Direct Upload 방식의 `life-cost-lab` 프로젝트가 있습니다. Direct Upload 프로젝트는 Git 연동 방식으로 전환할 수 없으므로, **GitHub 자동 배포용 새 Pages 프로젝트를 별도로 만들어야 합니다.** 새 프로젝트가 정상 작동하기 전에는 기존 프로젝트를 삭제하거나 개인 도메인을 옮기지 마세요.[^cf-git]

## 1. 배포 전 확인할 실제 운영 정보

`client/src/data/siteConfig.ts`에는 현재 아래 값이 설정되어 있습니다.

| 항목 | 현재 값 | 운영 시 유의할 점 |
|---|---|---|
| 사이트명 | `생활비랩` | 모든 페이지의 공통 브랜드명 |
| 대표 도메인 | `https://xn--v69a23sc9g7wd.kr` | canonical·Sitemap·구조화 데이터의 기준 주소 |
| 운영자명 | `생활비랩` | 정책 페이지에 표시 |
| 문의 이메일 | 비어 있음 | 실제 이메일을 준비한 뒤 한 곳에만 입력 |
| Analytics / AdSense | 비어 있음 | 실제 발급 ID가 있을 때만 입력 |

도메인과 운영자명은 이미 실제 값으로 설정되어 있습니다. 문의 이메일, 분석, 광고를 나중에 사용하기 시작하면 개인정보처리방침도 실제 수집·외부 서비스 현황에 맞게 함께 수정하세요.

## 2. GitHub의 최신 코드 준비

자동 배포에 연결할 저장소는 **`gjh4842-cyber/life-cost-lab`**, 운영 브랜치는 **`main`**입니다. Cloudflare에 연결하기 전에 최신 사이트 수정 사항이 이 저장소의 `main` 브랜치에 올라가 있어야 합니다. 저장소 최상단에 `package.json`, `client`, `scripts` 폴더가 보이면 준비된 상태입니다.

새 글을 추가하거나 설정을 수정할 때마다 검토 후 `main`에 올리면, Git 연동이 끝난 뒤 Cloudflare가 자동으로 새 배포를 만듭니다.[^cf-git]

## 3. GitHub 자동 배포용 새 Pages 프로젝트 만들기

1. Cloudflare Dashboard에서 **Workers & Pages → Create application → Pages → Connect to Git**으로 이동합니다.
2. GitHub 연결을 허용하고 저장소 목록에서 **`gjh4842-cyber/life-cost-lab`**을 선택합니다.
3. 기존 Direct Upload 프로젝트 이름 `life-cost-lab`은 이미 사용 중이므로, 프로젝트 이름에는 예를 들어 **`life-cost-lab-site`**를 입력합니다.
4. 아래 설정값을 입력한 뒤 **Save and Deploy**를 선택합니다.

| 설정 항목 | 입력값 |
|---|---|
| Production branch | `main` |
| Framework preset | `None` 또는 사용자 지정 |
| Build command | `pnpm build:cloudflare` |
| Build output directory | `dist/public` |
| Root directory | 비워 둠 |

Cloudflare가 의존성을 설치하고 빌드한 뒤 `프로젝트이름.pages.dev` 형식의 임시 주소를 표시합니다. 이 프로젝트는 GitHub 연동 프로젝트가 아직 생성되지 않은 상태이므로, 아래 설정은 새 프로젝트를 만들 때 적용해야 합니다.[^cf-build]

## 4. `pages.dev` 주소에서 먼저 확인하기

개인 도메인을 연결하기 전에 새 `pages.dev` 주소에서 다음을 확인합니다. 이 단계는 DNS 문제와 사이트 문제를 분리하는 데 중요합니다.

| 확인 경로 | 정상 기준 |
|---|---|
| `/` | 메인 화면, 여섯 카테고리, 검색, 최신 글이 보임 |
| `/articles` | 글 목록과 실제 페이지 이동이 보임 |
| `/category/living-cost` | 생활비·절약 글과 범위 안내가 보임 |
| `/articles/monthly-living-costs-first-list` | 본문, 목차, 검토일, 관련 글이 보임 |
| `/search?q=에어컨%20물이%20새요` | 관련 글을 찾음 |
| `/calculators` | 다섯 생활 계산기 카드가 보임 |
| `/calculators/monthly-living-cost` | 숫자 입력 후 결과가 바뀜 |
| `/robots.txt` / `/sitemap.xml` | 실제 대표 도메인을 포함한 텍스트·XML이 보임 |
| 존재하지 않는 주소 | 안내 문구가 있는 404 화면이 보임 |

## 5. 개인 도메인을 새 프로젝트에 연결하기

새 `pages.dev` 주소에서 사이트가 정상 동작한 것을 확인한 뒤, 새 Pages 프로젝트에서 **Custom domains → Set up a domain**을 선택하고 `xn--v69a23sc9g7wd.kr`을 입력합니다. 도메인을 수동 DNS 레코드보다 먼저 Pages에 추가해야 Cloudflare가 필요한 연결 상태를 확인할 수 있습니다.[^cf-domain]

| 주소 형태 | 해야 할 일 |
|---|---|
| 루트 도메인 `xn--v69a23sc9g7wd.kr` | Cloudflare에 해당 도메인 Zone을 추가하고, 도메인을 구매한 곳에서 Cloudflare가 안내한 네임서버 2개로 변경합니다. 이후 Pages 화면의 안내에 따라 연결 상태를 확인합니다. |
| `www` 사용 | 대표 주소로 쓸지 먼저 결정합니다. 사용한다면 Pages의 Custom domains에서 `www`도 추가하고, 대표가 아닌 주소는 301 리디렉션으로 한 곳에 모읍니다. |

현재 `siteConfig.ts`의 대표 URL은 루트 도메인 `https://xn--v69a23sc9g7wd.kr`입니다. `www`를 대표 주소로 바꾸기로 결정하기 전에는 이 값을 변경하지 마세요. HTTPS 인증서와 DNS 전파에는 시간이 걸릴 수 있으므로 연결 상태가 **Active**가 된 뒤 PC와 스마트폰에서 다시 확인합니다.

## 6. Search Console 등록과 Sitemap 제출

1. [Google Search Console](https://search.google.com/search-console/welcome)에서 **속성 추가**를 선택합니다.
2. `https://` 없이 `xn--v69a23sc9g7wd.kr`을 입력해 **도메인 속성**을 만듭니다.
3. Google이 알려 준 TXT 인증 값을 Cloudflare의 **DNS → Records → Add record**에서 추가합니다.
4. 인증이 완료되면 **Sitemaps** 메뉴에서 `sitemap.xml`을 제출합니다.
5. 새 글을 배포한 뒤에는 사이트맵 보고서와 페이지 색인 상태를 주기적으로 확인합니다.[^gsc-property] [^gsc-sitemap]

> Sitemap 제출은 URL을 알리는 절차이며, Google의 크롤링·색인이나 광고 승인을 보장하지 않습니다. 실제 콘텐츠 품질, 최신성, 접근성, 정책 준수는 계속 운영해야 합니다.

## 7. 새 글을 추가한 뒤의 반복 순서

`CONTENT_PUBLISHING.md`의 기준에 따라 글의 제목, 고유 slug, 카테고리, 태그, 검색어, 발행일, 최종 검토일, 실제 근거 자료를 추가합니다. 로컬에서 `pnpm build:cloudflare`가 통과하는지 확인한 뒤 GitHub `main`에 올리면, GitHub 연동 Pages 프로젝트가 자동으로 새 글과 Sitemap을 빌드합니다.

배포가 끝나면 새 글 URL, 관련 글, 모바일 본문, `https://xn--v69a23sc9g7wd.kr/sitemap.xml`을 열어 실제 반영 여부를 확인하세요.

## 자주 생기는 문제

| 증상 | 먼저 확인할 것 |
|---|---|
| 기존 프로젝트 이름이 이미 있다고 표시됨 | Direct Upload의 `life-cost-lab`이 존재합니다. 새 Git 프로젝트에는 다른 이름을 사용합니다. |
| Cloudflare 빌드가 실패함 | Build command가 `pnpm build:cloudflare`, Output directory가 `dist/public`인지 확인합니다. |
| `pages.dev`에서 404가 보임 | 배포 로그에 `dist/public/index.html`이 생성됐는지 확인하고, URL 경로에 오타가 없는지 봅니다. |
| 개인 도메인이 열리지 않음 | Custom domains에서 먼저 도메인을 추가했는지, Zone·네임서버·DNS 전파 상태를 확인합니다. |
| Sitemap이 비어 있거나 옛 주소임 | `siteConfig.ts`의 `domain`을 확인하고 새 빌드를 GitHub `main`에 올립니다. |
| Search Console 인증이 안 됨 | Cloudflare DNS의 TXT 레코드 이름과 값을 Google 화면과 다시 비교한 뒤 전파 후 재시도합니다. |

## 참고 자료

[^cf-git]: [Cloudflare Pages — Git 통합 배포 안내](https://developers.cloudflare.com/pages/get-started/git-integration/)
[^cf-build]: [Cloudflare Pages — 빌드 명령과 출력 디렉터리 설정](https://developers.cloudflare.com/pages/configuration/build-configuration/)
[^cf-domain]: [Cloudflare Pages — 사용자 지정 도메인 연결](https://developers.cloudflare.com/pages/configuration/custom-domains/)
[^gsc-property]: [Google Search Console — 웹사이트 속성 추가 및 인증](https://support.google.com/webmasters/answer/34592?hl=ko)
[^gsc-sitemap]: [Google Search Console — Sitemap 보고서와 제출](https://support.google.com/webmasters/answer/7451001?hl=ko)
