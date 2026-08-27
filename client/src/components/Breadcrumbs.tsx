/**
 * Design note — 여백의 생활편집실: Breadcrumb은 현재 문서의 위치를 조용한 점선과 인덱스로 보여 주는 탐색 보조선이다.
 */
import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <div className="breadcrumb-bar"><nav className="content-wrap" aria-label="현재 위치"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 && <ChevronRight size={14} aria-hidden="true" />}{item.href ? <Link href={item.href}>{index === 0 ? <><Home size={14} aria-hidden="true" />{item.label}</> : item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav></div>;
}
