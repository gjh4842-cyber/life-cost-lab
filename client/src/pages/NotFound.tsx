/**
 * Design note — 여백의 생활편집실: 길을 잃은 화면도 다음 탐색을 안내하는 문서 면으로 구성해, 안내소의 맥락을 유지한다.
 */
import { ArrowRight, Compass, Search } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return <PageShell title="페이지를 찾을 수 없습니다" description="요청하신 페이지를 찾을 수 없습니다. 한결생활 가이드에서 필요한 생활 정보를 다시 찾아보세요." path="/404">
    <section className="not-found content-wrap"><div className="not-found__marker"><Compass size={24} /><span>안내문 404</span></div><p className="eyebrow">찾을 수 없는 주소</p><h1>찾으시는 정보의<br /><span>주소를 확인해 주세요.</span></h1><p>주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 아래 안내에서 필요한 생활 정보를 다시 찾아보세요.</p><div className="not-found__guide"><div><span className="index-orb">01</span><strong>전체 글에서 찾기</strong><Link href="/articles">최근 검토한 글 보기 <ArrowRight size={17} /></Link></div><div><span className="index-orb">02</span><strong>키워드로 다시 찾기</strong><Link href="/search"><Search size={16} /> 사이트 검색 열기</Link></div><div><span className="index-orb">03</span><strong>분야부터 살펴보기</strong><Link href="/">홈의 주제별 안내 보기 <ArrowRight size={17} /></Link></div></div></section>
  </PageShell>;
}
