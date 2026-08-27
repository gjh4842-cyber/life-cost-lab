# Cloudflare Pages 배포 설정 확인 기록

확인일: 2026-08-27

- Cloudflare Pages는 사용자 지정 도메인을 **Workers & Pages → 프로젝트 → Custom domains → Set up a domain** 순서로 연결해야 한다.
- 루트 도메인(`example.com`)은 해당 도메인을 Cloudflare Zone으로 추가하고 등록기관에서 Cloudflare 네임서버로 변경해야 한다. 완료 후 Cloudflare가 필요한 CNAME을 생성한다.
- `www.example.com`과 같은 서브도메인은 Pages 대시보드에서 먼저 사용자 지정 도메인으로 연결한 뒤, Cloudflare Zone이 아니라면 DNS 제공자에 CNAME을 `프로젝트이름.pages.dev`로 추가한다.
- 도메인을 Pages에 먼저 연결하지 않고 CNAME만 추가하면 522 오류가 발생할 수 있다.
- 빌드 명령은 배포 산출물을 생성하고, 빌드 출력 디렉터리는 해당 명령으로 생성된 실제 폴더여야 한다. 이 프로젝트는 `pnpm build:cloudflare` 및 `dist/public`을 사용한다.

출처:

- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/build-configuration/
