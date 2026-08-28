/** Design note — 생활비랩: 결과는 사용자의 입력값에서만 산출하며, 계산 기준과 주의사항을 문서형 안내로 함께 제시한다. */
import { ArrowLeft, Calculator, Info } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { getArticle, type Article } from "@/data/content";
import { getCalculator } from "@/data/calculators";
import NotFound from "@/pages/NotFound";

const format = (value: number) => new Intl.NumberFormat("ko-KR").format(Math.max(0, Math.round(value)));

export default function CalculatorPage() {
  const { slug } = useParams<{ slug: string }>();
  const calculator = getCalculator(slug);
  const [values, setValues] = useState<Record<string, number>>({});

  if (!calculator) return <NotFound />;

  const number = (key: string) => Math.max(0, values[key] || 0);
  const filled = calculator.fields.every((field) => number(field.key) > 0);
  let result = 0;
  let suffix = "원";
  let detail = calculator.resultDescription;

  if (calculator.slug === "monthly-living-cost") {
    result = number("fixed") + number("variable");
    detail = filled ? `입력한 생활비는 ${format(result)}원이며, 수입에서 ${format(number("income") - result)}원이 남는 것으로 계산됩니다.` : calculator.resultDescription;
  } else if (calculator.slug === "car-annual-cost") {
    result = number("insurance") + number("tax") + number("maintenance") + number("monthlyDriving") * 12;
    detail = filled ? `월 연료·주차비 ${format(number("monthlyDriving"))}원을 12개월로 계산해 더한 값입니다.` : calculator.resultDescription;
  } else if (calculator.slug === "travel-budget") {
    result = number("transport") + number("stay") + number("food") + number("activity");
  } else if (calculator.slug === "fixed-cost-rate") {
    result = number("income") > 0 ? (number("fixed") / number("income")) * 100 : 0;
    suffix = "%";
    detail = filled ? `월 수입 ${format(number("income"))}원 중 고정지출 ${format(number("fixed"))}원이 차지하는 비율입니다.` : calculator.resultDescription;
  } else {
    result = Math.max(0, number("before") - number("after")) * number("months");
    detail = filled ? `한 달에 ${format(Math.max(0, number("before") - number("after")))}원을 줄인다고 가정한 단순 계산값입니다.` : calculator.resultDescription;
  }

  const guideArticles = (calculator.guideSlugs ?? [])
    .map((guideSlug) => getArticle(guideSlug))
    .filter((article): article is Article => Boolean(article));

  return (
    <PageShell
      title={calculator.name}
      description={calculator.description}
      path={`/calculators/${calculator.slug}`}
      breadcrumbs={[{ label: "홈", href: "/" }, { label: "생활 계산기", href: "/calculators" }, { label: calculator.name }]}
    >
      <section className="calculator-hero calculator-hero--detail">
        <div className="content-wrap">
          <Link className="back-link" href="/calculators"><ArrowLeft size={17} /> 생활 계산기 목록으로</Link>
          <p className="eyebrow">생활비랩 계산기</p>
          <h1>{calculator.name}</h1>
          <p>{calculator.description}</p>
        </div>
      </section>
      <section className="calculator-section content-wrap">
        <div className="calculator-section__intro">
          <div className="tool-icon"><Calculator size={28} /></div>
          <div>
            <p className="eyebrow">입력 기준</p>
            <h2>확인한 금액을<br />차례로 입력하세요.</h2>
            <p>입력한 숫자는 브라우저 안에서만 계산되며 별도로 저장하지 않습니다.</p>
          </div>
        </div>
        <div className="calculator-document-meta">
          <span><b>계산 기준</b> {calculator.resultDescription}</span>
          <span><b>이용 안내</b> 입력값을 바꾸면 결과가 바로 반영됩니다.</span>
        </div>
        <div className="calculator-box">
          <div className="calculator-fields">
            <p className="calculator-fields__title"><span>01</span> 금액을 입력해 보세요</p>
            {calculator.fields.map((field) => (
              <label key={field.key}>
                {field.label}
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={values[field.key] || ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.key]: Number(event.target.value) }))}
                  placeholder={field.placeholder}
                  aria-label={field.label}
                />
                <small>{field.help}</small>
              </label>
            ))}
          </div>
          <div className="calculator-result">
            <span>{calculator.resultTitle}</span>
            <strong>{filled ? format(result) : "—"}<small>{filled && suffix}</small></strong>
            <p>{filled ? detail : "모든 항목에 0보다 큰 금액을 입력하면 결과가 표시됩니다."}</p>
            <i>입력 값 기준 · 참고용 계산 결과</i>
          </div>
        </div>
        <div className="calculator-note"><Info size={18} /><p>{calculator.note}</p></div>
      </section>
      {guideArticles.length > 0 && (
        <section className="related-section calculator-related-section">
          <div className="content-wrap">
            <div className="section-intro section-intro--compact">
              <div>
                <p className="eyebrow">계산 전 읽을 정보</p>
                <h2>입력 항목을<br />먼저 정리해 보세요.</h2>
              </div>
              <Link className="text-link" href="/articles">생활정보 전체 보기 <ArrowLeft size={17} /></Link>
            </div>
            <div className="related-grid">
              {guideArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
