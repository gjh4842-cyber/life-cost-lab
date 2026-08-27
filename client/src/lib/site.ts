export const SITE_NAME = "한결생활 가이드";
export const SITE_DESCRIPTION = "일상에서 바로 필요한 생활 정보를 정확한 순서로 풀어내는 읽기 쉬운 생활 정보 안내소입니다.";

export function setPageMeta(title: string, description: string, path = "/") {
  document.title = `${title} | ${SITE_NAME}`;
  const update = (selector: string, attribute: "name" | "property", value: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(selector);
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attribute, selector.match(/"(.+)"/)?.[1] ?? ""); document.head.appendChild(tag); }
    tag.content = value;
  };
  update('meta[name="description"]', "name", description);
  update('meta[property="og:title"]', "property", `${title} | ${SITE_NAME}`);
  update('meta[property="og:description"]', "property", description);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
  canonical.href = `${window.location.origin}${path}`;
}
