/** Design note — 여백의 생활편집실: 검색은 헤더 바로 아래에 넓게 놓아, 큰 글씨와 함께 첫 탐색을 단순하게 만든다. */
import { Search } from "lucide-react";
import { useLocation } from "wouter";

export function HeaderSearchBar() {
  const [, setLocation] = useLocation();
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const query = new FormData(event.currentTarget).get("header-search")?.toString().trim(); if (query) setLocation(`/search?q=${encodeURIComponent(query)}`); };
  return <section className="header-search-bar" aria-label="사이트 검색"><div className="content-wrap header-search-bar__inner"><p><strong>필요한 생활 정보가 있으신가요?</strong><span>제도, 건강, 휴대폰, 계약처럼 기억나는 단어로 찾아보세요.</span></p><form role="search" onSubmit={submitSearch}><Search size={21} aria-hidden="true" /><input name="header-search" placeholder="예: 지원금, 건강검진, 휴대폰 사진" aria-label="사이트 검색어" /><button type="submit">검색</button></form></div></section>;
}
