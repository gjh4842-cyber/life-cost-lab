/** Design note — 여백의 생활편집실: 길을 잃은 화면도 다음 탐색을 안내하는 조용한 문서 면으로 유지한다. */
import { ArrowLeft } from "lucide-react"; import { Link } from "wouter"; import { PageShell } from "@/components/PageShell";
export default function NotFound() { return <PageShell title="페이지를 찾을 수 없습니다" description="요청하신 페이지를 찾을 수 없습니다." path="/404"><section className="not-found content-wrap"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>찾으시는 정보의<br /><span>주소를 확인해 주세요.</span></h1><p>주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 홈에서 필요한 주제를 다시 찾아보세요.</p><Link href="/"><ArrowLeft size={18} /> 홈으로 돌아가기</Link></section></PageShell>; }
