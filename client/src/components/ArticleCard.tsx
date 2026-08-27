/** Design note — 여백의 생활편집실: 카드에는 문서의 맥락을 위한 메타데이터와 충분한 여백을 남긴다. */
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { Article } from "@/data/content";
import { getCategory } from "@/data/content";
export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) { const category = getCategory(article.category); return <article className={`article-card ${priority ? "article-card--priority" : ""}`}><div className="article-card__ribbon" data-accent={category?.accent}><span>{category?.name}</span><span>{article.readTime}</span></div><div className="article-card__content"><p className="article-card__date">게시일 {article.publishedAt}</p><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p className="article-card__excerpt">{article.excerpt}</p><Link className="article-card__link" href={`/articles/${article.slug}`}>내용 읽기 <ArrowUpRight size={18} /></Link></div></article>; }
