/**
 * Design note — 여백의 생활편집실: 개인정보 안내는 모호한 약관이 아니라 현재 사이트의 수집·이용 상태를 표로 명확히 전달한다.
 */
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/data/siteConfig";

export default function Privacy() {
  return <PageShell title="개인정보처리방침" description="한결생활 가이드의 개인정보 처리 기준과 이용자 권리 안내입니다." path="/privacy">
    <section className="policy-hero"><div className="content-wrap"><p className="eyebrow">개인정보처리방침</p><h1>개인정보는<br /><span>필요한 만큼만</span> 다룹니다.</h1><p>이 방침은 한결생활 가이드의 개인정보 처리 기준을 설명합니다. 기능 또는 외부 서비스가 바뀌면 이 페이지의 내용을 함께 검토하고 갱신합니다.</p><div className="policy-hero__meta"><span>시행일 {siteConfig.privacyEffectiveDate}</span><span>최종 검토일 {siteConfig.privacyEffectiveDate}</span></div></div></section>
    <section className="legal-content content-wrap"><div className="legal-aside"><ShieldCheck size={28} /><p>운영 전 확인</p><span>운영자 정보와 실제 사용 중인 분석·광고·문의 서비스를 기준으로 최종 내용을 검토하세요.</span></div><div className="legal-document"><section><p className="section-index">01</p><h2>처리하는 개인정보</h2><p>현재 기본 사이트는 회원 가입, 댓글, 온라인 문의 접수 기능을 제공하지 않으며, 이용자가 직접 입력하는 개인정보를 별도로 수집하지 않습니다. 운영자가 이메일 문의, 뉴스레터, 댓글 등 새로운 기능을 추가할 경우에는 수집 항목과 목적, 보관 기간을 이 방침에 구체적으로 추가합니다.</p></section><section><p className="section-index">02</p><h2>자동으로 수집될 수 있는 정보</h2><p>웹사이트 운영 과정에서 접속 기록, 기기·브라우저 정보, 방문 시각, 페이지 이용 기록과 같은 정보가 서버 운영, 보안, 방문 통계 목적으로 생성될 수 있습니다. 실제 이용 중인 호스팅·분석·광고 서비스에 따라 처리 방식과 보관 기간이 달라질 수 있습니다.</p><div className="legal-table-wrap"><table><thead><tr><th>구분</th><th>현재 기본 상태</th><th>추가 기능 도입 시 확인할 내용</th></tr></thead><tbody><tr><td>문의</td><td>이메일 주소 미설정 / 온라인 접수 없음</td><td>수집 항목, 수신자, 보관 기간, 삭제 방법</td></tr><tr><td>방문 통계</td><td>배포 환경의 기본 로그가 생성될 수 있음</td><td>분석 도구 이름, 쿠키 사용 여부, 보관 기간</td></tr><tr><td>광고</td><td>광고 미게재</td><td>광고 사업자, 맞춤 광고·쿠키 관련 고지</td></tr></tbody></table></div></section><section><p className="section-index">03</p><h2>쿠키와 외부 서비스</h2><p>쿠키 또는 유사 기술을 사용하는 분석·광고·소셜 기능을 도입하는 경우, 서비스의 목적과 사용 여부를 이 페이지에 고지합니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 제한하거나 삭제할 수 있으나 일부 기능 이용에 영향이 있을 수 있습니다.</p></section><section><p className="section-index">04</p><h2>이용자의 권리와 문의</h2><p>이용자는 자신에 관한 개인정보 처리와 관련해 열람, 정정, 삭제 또는 처리 정지를 요청할 수 있습니다. 권리 행사를 위한 실제 운영자 연락처는 배포 전 문의 페이지와 이 방침에 함께 등록해야 합니다.</p><div className="legal-callout"><CheckCircle2 size={19} /><p>운영자는 문의·분석·광고 서비스를 추가하거나 변경하기 전에 이 방침의 실제 처리 현황을 검토하고, 업데이트 날짜를 함께 표시합니다.</p></div></section></div></section>
  </PageShell>;
}
