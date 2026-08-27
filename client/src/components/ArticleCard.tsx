/** Design note — 여백의 생활편집실: 카드에는 원형 문서 인덱스, 검토 날짜, 점선 구분선을 반복해 한결생활의 문서 문법을 만든다. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Article } from "@/data/content";
import { getCategory } from "@/data/content";
export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) { const category = getCategory(article.category); return <article className={`article-card ${priority ? "article-card--priority" : ""}`}><div className="article-card__ribbon" data-accent={category?.accent}><span>{category?.name}</span><span>{article.readTime}</span></div><div className="article-card__content"><div className="article-card__metadata"><span className="article-card__index" aria-hidden="true">안내</span><p className="article-card__date">게시 {article.publishedAt}<br />검토 {article.reviewedAt}</p></div><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p className="article-card__excerpt">{article.excerpt}</p><Link className="article-card__link" href={`/articles/${article.slug}`}>내용 읽기 <ArrowUpRight size={18} /></Link></div></article>; }
