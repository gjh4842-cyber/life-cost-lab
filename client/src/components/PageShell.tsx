/** Design note — 여백의 생활편집실: 모든 화면은 고정 헤더와 넓은 읽기 호흡을 공유한다. */
import type { ReactNode } from "react";
import { useEffect } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { setPageMeta } from "@/lib/site";
export function PageShell({ children, title, description, path }: { children: ReactNode; title: string; description: string; path?: string }) { useEffect(() => { setPageMeta(title, description, path); }, [title, description, path]); return <div className="site-frame"><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div>; }
