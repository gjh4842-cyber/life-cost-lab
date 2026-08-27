/**
 * Design note — 여백의 생활편집실: 면책 안내는 책임을 회피하는 장식이 아니라 독자가 정보의 적용 범위를 판단하도록 돕는 기준표다.
 */
import { AlertTriangle, ArrowRight, CircleHelp } from "lucide-react";
import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";

export default function Disclaimer() {
  return <PageShell title="면책 안내" description="한결생활 가이드에서 제공하는 생활 정보의 이용 범위와 확인이 필요한 사항을 안내합니다." path="/disclaimer">
    <section className="service-hero service-hero--ink"><div className="content-wrap"><p className="eyebrow">면책 안내</p><h1>정보를 읽은 뒤에는<br /><span>내 상황에 맞게</span> 확인하세요.</h1><p>한결생활 가이드는 생활 속 정보 이해를 돕기 위한 일반적인 안내를 제공합니다. 개별 상황에 대한 전문적인 판단이나 결과를 보장하지 않습니다.</p></div></section>
    <section className="disclaimer-page content-wrap"><div className="disclaimer-intro"><AlertTriangle size={29} /><div><p className="eyebrow">이용 전 확인</p><h2>정보의 범위를 분명히 합니다.</h2><p>제도, 건강, 주거, 금융처럼 기준과 개인 상황에 따라 결과가 달라질 수 있는 주제는 아래 원칙을 먼저 확인해 주세요.</p></div></div><div className="disclaimer-grid"><div><span>01</span><h3>일반 정보입니다</h3><p>게시글은 작성 시점의 일반적인 생활 정보를 정리한 것입니다. 독자의 연령, 건강 상태, 소득, 계약 조건 등 개인별 사정에 맞춘 상담이나 진단을 대신하지 않습니다.</p></div><div><span>02</span><h3>최신 공식 안내를 확인하세요</h3><p>지원 제도, 행정 절차, 법령, 수수료, 일정은 변경될 수 있습니다. 실제 신청·계약·결정 전에는 해당 기관의 공식 공고와 최신 안내를 확인해야 합니다.</p></div><div><span>03</span><h3>전문가의 도움을 받으세요</h3><p>의료·법률·세무·금융·부동산처럼 중요한 결정이 필요한 경우, 자격을 갖춘 전문가 또는 공식 상담 창구에 개별 상황을 확인하세요.</p></div></div><div className="disclaimer-question"><CircleHelp size={25} /><div><h2>오래되었거나 잘못된 정보를 발견했다면</h2><p>해당 글의 제목 또는 주소와 함께 확인이 필요한 내용을 알려 주세요. 검토가 필요한 내용은 수정하거나 최신 정보로 보완합니다.</p><Link href="/contact">정정 요청 안내 보기 <ArrowRight size={17} /></Link></div></div></section>
  </PageShell>;
}
