/**
 * Design note — 여백의 생활편집실: 문의 페이지도 접수 전 필요한 정보를 먼저 정리하는 안내 문서로 구성한다.
 */
import { ArrowRight, FileText, Mail, MessageSquareText } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/siteConfig";

export default function Contact() {
  const hasContactEmail = Boolean(siteConfig.contactEmail);
  return <PageShell title="문의 안내" description="한결생활 가이드의 콘텐츠 정정, 이용 문의, 제휴 요청을 위한 안내입니다." path="/contact">
    <section className="service-hero"><div className="content-wrap"><p className="eyebrow">문의 안내</p><h1>더 정확한 안내를 위해<br /><span>의견을 남겨 주세요.</span></h1><p>내용의 오류, 오래된 정보, 다루었으면 하는 생활 주제가 있다면 운영자에게 알려 주세요. 확인이 필요한 정보는 검토 후 반영합니다.</p></div></section>
    <section className="contact-page content-wrap"><div className="contact-page__lead"><div className="service-icon"><MessageSquareText size={29} /></div><div><p className="eyebrow">연락 방법</p><h2>운영자에게 보내는 문의</h2><p>개인정보나 민감한 자료는 이메일에 포함하지 말고, 필요한 내용만 간단히 적어 보내 주세요.</p></div></div>
      <div className="contact-channel">{hasContactEmail ? <><div><span>운영 이메일</span><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><p>메일 제목에 ‘한결생활 가이드 문의’를 적어 주시면 분류에 도움이 됩니다.</p></div><a className="contact-channel__action" href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("한결생활 가이드 문의")}`}>이메일 작성하기 <ArrowRight size={18} /></a></> : <div className="launch-notice"><span>운영 안내</span><h3>문의 접수 경로를 준비하고 있습니다.</h3><p>공식 문의 이메일이 마련되면 이 페이지에서 안내합니다. 그동안에는 각 글의 게시일과 최종 검토일을 먼저 확인해 주세요.</p></div>}</div>
      <div className="contact-guides"><div><FileText size={24} /><h3>정정 요청</h3><p>글 제목 또는 주소, 확인이 필요한 문장, 참고한 최신 출처를 함께 남겨 주세요.</p></div><div><Mail size={24} /><h3>주제 제안</h3><p>어떤 상황에서 어떤 정보가 필요했는지 알려 주시면 새 콘텐츠를 기획할 때 참고합니다.</p></div><div><MessageSquareText size={24} /><h3>답변 안내</h3><p>모든 문의에 개별 답변을 드리기 어려울 수 있으며, 필요한 경우 게시글 수정으로 반영할 수 있습니다.</p></div></div>
      <div className="contact-page__links"><Link href="/privacy">개인정보처리방침 확인하기 <ArrowRight size={16} /></Link><Link href="/disclaimer">면책 안내 확인하기 <ArrowRight size={16} /></Link></div>
    </section>
  </PageShell>;
}
