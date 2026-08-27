# 한결생활 가이드: Cloudflare Pages 배포와 개인 도메인 연결 안내

이 문서는 **GitHub와 Cloudflare를 처음 사용하는 운영자**를 기준으로 작성했습니다. 현재 프로젝트는 정적 사이트이며, Cloudflare Pages에서 `pnpm build:cloudflare` 명령을 실행하면 `dist/public` 폴더에 실제 배포용 파일이 생성됩니다. 게시글·카테고리별 HTML, `404.html`, `robots.txt`, `sitemap.xml`, `ads.txt`도 이 과정에서 함께 준비됩니다.

> **중요:** 실제 도메인, 운영자명, 문의 이메일을 입력하기 전에는 배포하지 않는 것이 좋습니다. 빈 값일 때는 잘못된 canonical URL과 Sitemap URL을 만들지 않도록 설계되어 있으나, 운영 사이트의 신뢰 정보는 공개 전에 완성해야 합니다.

## 1. 배포 전 운영 정보 입력

프로젝트에서 `client/src/data/siteConfig.ts` 파일을 열고 아래 항목을 **실제 정보**로 바꾸세요. `domain`은 반드시 주소 전체를 HTTPS로 입력하고, `www`를 쓸지 여부까지 최종 결정한 주소와 일치시켜야 합니다.

```ts
export const siteConfig = {
  siteName: "한결생활 가이드",
  domain: "https://example.com",
  contactEmail: "운영에 사용할 실제 이메일 주소",
  operatorName: "실제 운영자명 또는 사업자명",
  googleAnalyticsId: "", // GA4를 실제로 쓸 때만 G-로 시작하는 ID 입력
  adsenseClient: "",     // AdSense 승인·설정 뒤에만 ca-pub- ID 입력
};
```

이메일 문의를 받을 계획이 없다면 문의 페이지의 문구를 현재 운영 방식에 맞게 고치고, 개인정보처리방침에도 실제 수집·분석·광고 서비스를 반영하세요. 승인 전이거나 사용하지 않는 광고·분석 코드는 빈 값으로 두면 사이트에서 불러오지 않습니다.

## 2. GitHub에 소스 코드 올리기

Cloudflare Pages는 GitHub 또는 GitLab 저장소를 연결하면, `main` 브랜치에 변경 사항을 올릴 때마다 자동으로 빌드하고 배포할 수 있습니다.[^cf-git]

| 순서 | 할 일 | 확인 방법 |
|---:|---|---|
| 1 | 이 프로젝트의 최신 코드를 GitHub 저장소로 내보내거나 내려받아 새 저장소에 올립니다. | 저장소 최상단에 `package.json`, `client`, `scripts` 폴더가 보입니다. |
| 2 | 저장소의 기본 브랜치를 `main`으로 둡니다. | GitHub 상단의 브랜치 선택 메뉴에 `main`이 보입니다. |
| 3 | 운영 정보 변경 후에는 GitHub에 변경 사항을 커밋하고 `main`으로 올립니다. | GitHub의 최신 커밋 시간이 바뀝니다. |

Manus 관리 화면에서 코드를 GitHub로 내보낼 수 있다면 이 방법이 가장 간단합니다. 그렇지 않다면 프로젝트 파일을 ZIP으로 내려받은 뒤 GitHub의 새 저장소에 업로드해도 됩니다. 첫 배포 뒤에는 한 번의 커밋이 한 번의 새 배포로 이어지므로, 글을 여러 편 수정할 때는 검토를 마친 뒤 함께 올리는 방식이 관리에 편합니다.

## 3. Cloudflare Pages 프로젝트 만들기

Cloudflare 대시보드에서 **Workers & Pages → Create application → Pages → Connect to Git** 순서로 이동해 GitHub 저장소를 연결합니다.[^cf-git] 저장소 접근 권한을 묻는 화면에서는 이 사이트의 저장소를 선택할 수 있게 허용하고, 방금 만든 저장소를 선택하세요.

빌드 설정 화면에서는 아래 값을 입력합니다. 일반 Vite 기본값이 아니라, 이 프로젝트의 정적 HTML·Sitemap 생성 명령을 사용해야 합니다.

| 설정 항목 | 입력값 | 이유 |
|---|---|---|
| Production branch | `main` | 공개 사이트에 반영할 브랜치입니다. |
| Framework preset | `None` 또는 사용자 지정 | 프로젝트의 자체 빌드 명령을 사용합니다. |
| Build command | `pnpm build:cloudflare` | 정적 HTML, Sitemap, robots.txt를 모두 생성합니다. |
| Build output directory | `dist/public` | Cloudflare가 실제로 업로드할 배포 폴더입니다. |
| Root directory | 비워 둠 | 저장소 최상단이 프로젝트인 경우의 기본값입니다. |

`Save and Deploy`를 누르면 Cloudflare가 의존성을 설치하고 빌드한 다음 `프로젝트이름.pages.dev` 형태의 임시 주소를 제공합니다. 빌드 결과 폴더를 Cloudflare Pages에 지정해야 한다는 원칙과 Git 연결 배포 절차는 Cloudflare 공식 문서에서 확인할 수 있습니다.[^cf-build] [^cf-static]

## 4. 임시 주소에서 먼저 확인하기

개인 도메인을 연결하기 전, Cloudflare가 제공한 `pages.dev` 주소에서 아래 항목을 확인하세요. 이 단계에서 문제가 있으면 개인 도메인과 DNS 설정을 섞지 않고 원인을 분리할 수 있습니다.

| 확인 주소 또는 동작 | 정상 기준 |
|---|---|
| `/` | 메인 화면과 대표 이미지가 보입니다. |
| `/articles` | 글 목록과 카테고리 링크가 보입니다. |
| 임의의 `/articles/글-slug` | 본문, 목차, 관련 글, Breadcrumb이 보입니다. |
| `/search` | 검색어가 없어도 카테고리·전체 글로 이동할 수 있습니다. |
| 존재하지 않는 주소 | 안내 문구가 있는 404 화면이 보입니다. |
| `/robots.txt` | `Allow: /`가 보입니다. |
| `/sitemap.xml` | 실제 도메인을 설정한 뒤에는 각 공개 URL이 XML로 보입니다. |

## 5. 개인 도메인 연결하기

먼저 **대표 주소를 하나 정합니다.** 예를 들어 `https://example.com`을 대표 주소로 사용할지, `https://www.example.com`을 대표 주소로 사용할지 결정하세요. 이 주소는 `siteConfig.ts`의 `domain` 값, canonical URL, Sitemap, Search Console 등록 주소와 같아야 합니다.

Cloudflare Pages 프로젝트에서 **Custom domains → Set up a domain**을 누르고 대표 주소를 입력한 뒤 안내를 따릅니다. 도메인을 먼저 Pages 프로젝트에 연결하는 절차를 거치지 않고 CNAME만 수동으로 만들면 주소가 정상 해석되지 않을 수 있으므로, 반드시 이 순서를 지키세요.[^cf-domain]

| 연결할 주소 | 해야 할 일 |
|---|---|
| 루트 도메인 `example.com` | 도메인을 Cloudflare의 **Zone**으로 추가하고, 도메인을 구매한 업체의 관리 화면에서 Cloudflare가 알려 준 네임서버 2개로 변경합니다. 네임서버 연결 후 Pages가 필요한 CNAME 레코드를 만들어 줍니다.[^cf-domain] |
| 서브도메인 `www.example.com` | Pages의 Custom domains에서 먼저 `www.example.com`을 추가합니다. 도메인이 Cloudflare Zone에 있으면 레코드가 자동 생성됩니다. 다른 DNS 업체를 계속 사용한다면, 안내받은 대로 `www` CNAME을 `프로젝트이름.pages.dev`로 추가합니다.[^cf-domain] |

루트와 `www`를 모두 연결했다면, 대표 주소가 아닌 쪽은 Cloudflare의 **Rules → Redirect Rules**에서 대표 주소로 301 리디렉션을 만드세요. 이후 **SSL/TLS** 설정에서 HTTPS가 적용되었는지 확인하고, 브라우저 주소창에서 `https://`로 열리는지 점검하세요. 인증서 발급·DNS 전파에는 시간이 걸릴 수 있으므로, 연결 직후 오류가 나더라도 잠시 기다렸다가 다른 네트워크에서 다시 확인하는 것이 좋습니다.[^cf-git]

## 6. 실제 도메인으로 다시 빌드·배포하기

도메인 연결을 마친 뒤에는 `siteConfig.ts`의 `domain`을 최종 대표 주소로 저장하고 GitHub `main`에 올리세요. Cloudflare Pages가 다시 빌드하면 canonical URL, Open Graph URL, JSON-LD, `robots.txt`, XML Sitemap이 그 주소를 기준으로 생성됩니다.

배포가 끝나면 다음 주소가 모두 **대표 HTTPS 도메인**으로 열리는지 확인하세요.

```text
https://내도메인/
https://내도메인/robots.txt
https://내도메인/sitemap.xml
https://내도메인/articles/글-slug
https://내도메인/존재하지-않는-주소
```

## 7. Google Search Console 등록과 Sitemap 제출

Google Search Console에서는 도메인 전체를 관리하려면 **도메인 속성**을 선택하고, 대표 도메인에서 안내한 DNS TXT 레코드를 Cloudflare DNS에 추가해 소유권을 확인하는 방법이 적합합니다. 도메인 속성은 `www` 등 하위 도메인과 프로토콜을 함께 포괄하며 DNS 인증을 사용합니다.[^gsc-property]

1. [Google Search Console](https://search.google.com/search-console/welcome)에 로그인하고 **속성 추가**를 선택합니다.
2. `https://` 없이 대표 도메인만 입력해 **도메인 속성**을 만듭니다. 예: `example.com`.
3. Google이 보여 주는 TXT 값을 복사합니다.
4. Cloudflare 대시보드에서 해당 도메인의 **DNS → Records → Add record**로 이동합니다.
5. 유형은 `TXT`, 이름은 Google이 안내한 값(일반적으로 `@` 또는 비워 둔 루트), 내용은 복사한 인증 문자열로 저장합니다.
6. Search Console 화면으로 돌아가 **인증**을 누릅니다. DNS 반영에 시간이 걸리면 잠시 후 다시 시도합니다.
7. 인증 뒤 **Sitemaps** 메뉴에서 `sitemap.xml`을 제출합니다. 이 보고서에서 읽기 성공 여부와 오류를 확인할 수 있습니다.[^gsc-sitemap]

> **주의:** Sitemap 제출은 Google에 URL 정보를 제공하는 절차이며 개별 페이지의 크롤링 또는 색인을 보장하지 않습니다.[^gsc-sitemap] 사이트의 콘텐츠 품질, 접근성, 실제 운영 정보, 기술 오류 여부는 별도로 계속 관리해야 합니다.

## 8. 게시글을 추가한 뒤의 운영 순서

새 글을 추가할 때는 `CONTENT_PUBLISHING.md`의 규칙에 따라 `client/src/data/content.ts`에 제목, 고유 slug, 카테고리, 요약, 발행일, 최종 검토일, 본문을 함께 입력합니다. 그 뒤 GitHub `main`에 올리면 Cloudflare가 새 정적 페이지와 Sitemap을 생성합니다. 관련 글·카테고리 목록·홈 최신 글은 같은 콘텐츠 데이터를 사용하므로 URL 구조와 디자인을 별도로 고칠 필요가 없습니다.

글을 추가한 후에는 대표 HTTPS 주소에서 글을 직접 열어 보고, 링크·관련 글·모바일 글자 크기를 확인하세요. 제도·건강·법률·금융처럼 변동 가능성이 있는 글은 게시 전과 업데이트 시점에 공식 출처와 최종 검토일을 확인해야 합니다.

## 자주 생기는 문제

| 증상 | 먼저 확인할 것 |
|---|---|
| Cloudflare 빌드가 실패함 | Build command가 `pnpm build:cloudflare`인지, Output directory가 `dist/public`인지 확인합니다. |
| `pages.dev`에서 404가 보임 | Cloudflare 배포 로그에서 `dist/public/index.html`이 생성됐는지 확인합니다. |
| 개인 도메인이 열리지 않음 | Custom domains에서 도메인을 먼저 연결했는지, 루트 도메인의 네임서버 변경이 끝났는지, CNAME 충돌이 없는지 확인합니다.[^cf-domain] |
| Sitemap이 비어 있음 | `siteConfig.ts`의 `domain`이 실제 HTTPS 대표 주소인지 확인하고 다시 배포합니다. |
| Search Console이 인증되지 않음 | Cloudflare DNS의 TXT 레코드 이름·값을 다시 비교하고 DNS 전파 후 재시도합니다.[^gsc-property] |

## 참고 자료

[^cf-static]: [Cloudflare Pages — 정적 HTML 배포 안내](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
[^cf-git]: [Cloudflare Pages — Git 통합 배포 안내](https://developers.cloudflare.com/pages/get-started/git-integration/)
[^cf-build]: [Cloudflare Pages — 빌드 명령과 출력 디렉터리 설정](https://developers.cloudflare.com/pages/configuration/build-configuration/)
[^cf-domain]: [Cloudflare Pages — 사용자 지정 도메인 연결](https://developers.cloudflare.com/pages/configuration/custom-domains/)
[^gsc-property]: [Google Search Console — 웹사이트 속성 추가 및 인증](https://support.google.com/webmasters/answer/34592?hl=ko)
[^gsc-sitemap]: [Google Search Console — Sitemap 보고서와 제출](https://support.google.com/webmasters/answer/7451001?hl=ko)
