/** Design note — 생활비랩: 첫 화면은 ‘검색 → 분야 선택 → 검토된 글 읽기’ 흐름을 큰 글씨와 여백으로 보여 준다. */
import { ArrowRight, Calculator, CarFront, Landmark, Map, WalletCards, House } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { articles, categories, type CategoryIcon } from "@/data/content";
import { calculators } from "@/data/calculators";
import { siteConfig } from "@/data/siteConfig";

const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  wallet: WalletCards,
  landmark: Landmark,
  car: CarFront,
  house: House,
  map: Map,
  calculator: Calculator,
};

export default function Home() {
  const featured = articles.filter((article) => article.featured).slice(0, 3);
  const newest = articles.slice(0, 4);
  const calculatorHighlights = calculators.slice(0, 3);

  return (
    <PageShell title="생활비 절약 및 생활정보" description={siteConfig.brandMessage} path="/">
      <section className="category-section content-wrap">
        <div className="section-intro section-intro--split">
          <div>
            <p className="eyebrow">여섯 가지 생활 분야</p>
            <h2>
              지금 필요한 비용부터
              <br />
              찾아보세요.
            </h2>
          </div>
          <p>{siteConfig.brandMessage} 생활비·복지·자동차·주거·여행·계산기를 한곳에서 찾을 수 있으며, 모든 글에는 게시일과 최종 검토일을 함께 표시합니다.</p>
        </div>
        <div className="category-rail">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.icon];
            const href = category.calculatorHub ? "/calculators" : `/category/${category.slug}`;
            return (
              <Link className="category-card h-full" data-accent={category.accent} href={href} key={category.slug}>
                <span className="category-card__number">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={30} strokeWidth={1.7} />
                <h3 className="line-clamp-2">{category.name}</h3>
                <p className="line-clamp-3">{category.description}</p>
                <span className="category-card__more">
                  {category.calculatorHub ? "계산기 보기" : "글 보기"} <ArrowRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="featured-section recommendation-section">
        <div className="content-wrap">
          <div className="section-intro section-intro--compact">
            <div>
              <p className="eyebrow">추천 생활정보</p>
              <h2>
                먼저 읽으면 좋은
                <br />
                생활비 기준을 확인하세요.
              </h2>
            </div>
            <p className="section-note">생활비랩이 먼저 읽기를 권하는 핵심 주제를 편집 기준으로 안내합니다.</p>
          </div>
          <div className="featured-grid">
            {featured.map((article, index) => (
              <ArticleCard article={article} priority={index === 0} key={article.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="latest-section content-wrap">
        <div className="latest-section__heading">
          <p className="eyebrow">최신 콘텐츠</p>
          <h2>
            새로 정리한
            <br />
            생활정보
          </h2>
          <p>기준이 바뀔 수 있는 정보는 최종 검토일을 함께 확인하세요.</p>
        </div>
        <div className="latest-list">
          {newest.map((article, index) => (
            <div className="latest-item" key={article.slug}>
              <span className="latest-item__index">{String(index + 1).padStart(2, "0")}</span>
              <span>{article.publishedAt}</span>
              <Link href={`/category/${article.category}`}>{categories.find((category) => category.slug === article.category)?.shortName}</Link>
              <Link className="latest-item__title" href={`/articles/${article.slug}`}>
                {article.title}
              </Link>
              <ArrowRight size={18} />
            </div>
          ))}
          <Link className="latest-list__all" href="/articles">
            전체 생활정보 보기 <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="calculator-section content-wrap">
        <div className="section-intro section-intro--split">
          <div>
            <p className="eyebrow">생활 계산기</p>
            <h2>
              생활 속 숫자,
              <br />
              먼저 정리해 보세요.
            </h2>
          </div>
          <p>수입과 지출, 차량 유지비, 여행비처럼 직접 입력한 숫자를 기준으로 필요한 금액을 간단히 비교합니다.</p>
        </div>
        <div className="calculator-grid">
          {calculatorHighlights.map((calculator, index) => (
            <Link className="calculator-card h-full" href={`/calculators/${calculator.slug}`} key={calculator.slug}>
              <span className="calculator-card__index">{String(index + 1).padStart(2, "0")}</span>
              <Calculator size={24} strokeWidth={1.8} />
              <h3 className="line-clamp-2">{calculator.name}</h3>
              <p className="line-clamp-3">{calculator.description}</p>
              <span className="calculator-card__more">
                계산해 보기 <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
        <Link className="latest-list__all calculator-section__all" href="/calculators">
          생활 계산기 전체 보기 <ArrowRight size={17} />
        </Link>
      </section>

      <section className="trust-section">
        <div className="content-wrap trust-section__inner">
          <div>
            <p className="eyebrow">생활비랩의 기준</p>
            <h2>
              광고보다 먼저,
              <br />
              정보의 기준을 분명하게.
            </h2>
          </div>
          <div className="trust-list">
            <div>
              <span>01</span>
              <p>
                <strong>읽기 쉬운 문장</strong>비용과 절차를 쉬운 말로 풀고, 중요한 내용은 확인 순서로 나눕니다.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>날짜를 남기는 정보</strong>게시일과 최종 검토일을 밝혀 정보가 언제 기준인지 알 수 있게 합니다.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>출처를 확인하는 태도</strong>제도와 수치는 공식 기관의 최신 안내를 다시 확인하도록 안내합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
