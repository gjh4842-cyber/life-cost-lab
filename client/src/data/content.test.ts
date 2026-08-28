import { describe, expect, it } from "vitest";
import { calculators } from "./calculators";
import {
  articles,
  categories,
  getArticle,
  getArticlesByCategory,
  getRelatedArticles,
  getSearchableText,
} from "./content";

describe("생활비랩 콘텐츠 탐색 구조", () => {
  it("모든 카테고리에 연결 가능한 콘텐츠가 있다", () => {
    for (const category of categories) {
      if (category.calculatorHub) continue;
      expect(getArticlesByCategory(category.slug).length).toBeGreaterThan(0);
    }
  });

  it("정보 카테고리는 서로 다른 콘텐츠를 6개 이상 제공한다", () => {
    for (const category of categories.filter((item) => !item.calculatorHub)) {
      expect(getArticlesByCategory(category.slug).length).toBeGreaterThanOrEqual(6);
    }
  });

  it("확장 글은 확인 방법·주의사항·FAQ·공식 출처를 포함한다", () => {
    const expanded = articles.filter((article) => article.publishedAt === "2026. 08. 28.");
    expect(expanded.length).toBeGreaterThanOrEqual(20);
    for (const article of expanded) {
      expect(article.sections.length).toBeGreaterThan(0);
      expect(article.audience).toBeTruthy();
      expect(article.verification).toBeTruthy();
      expect(article.cautions?.length ?? 0).toBeGreaterThan(0);
      expect(article.faqs?.length ?? 0).toBeGreaterThan(0);
      expect(article.sources?.length ?? 0).toBeGreaterThan(0);
      expect(article.reviewedAt).toBe(article.publishedAt);
    }
  });

  it("정부지원·복지 글은 공식기관 상세 출처를 가진다", () => {
    const officialHosts = ["mohw.go.kr", "gov.kr", "bokjiro.go.kr", "nps.or.kr", "work24.go.kr", "myhome.go.kr"];
    const welfareArticles = articles.filter((article) => article.category === "welfare");
    expect(welfareArticles.length).toBeGreaterThanOrEqual(6);
    for (const article of welfareArticles) {
      expect(article.sources?.length ?? 0).toBeGreaterThan(0);
      expect(article.sources?.every((source) => officialHosts.some((host) => new URL(source.url).hostname.endsWith(host)))).toBe(true);
    }
  });

  it("확장 글은 관련 계산기로 다시 이동할 수 있다", () => {
    const calculatorLinkedArticles = articles.filter((article) => calculators.some((calculator) => calculator.guideSlugs.includes(article.slug)));
    expect(calculatorLinkedArticles.length).toBeGreaterThan(0);
    for (const article of calculatorLinkedArticles) {
      expect(calculators.some((calculator) => calculator.guideSlugs.includes(article.slug))).toBe(true);
    }
  });

  it("모든 계산기는 실제 설명 콘텐츠와 연결된다", () => {
    for (const calculator of calculators) {
      expect(calculator.guideSlugs.length).toBeGreaterThan(0);
      expect(calculator.guideSlugs.every((slug) => Boolean(getArticle(slug)))).toBe(true);
    }
  });

  it("글의 명시적 관련글은 실제 존재하는 같은 콘텐츠로 연결된다", () => {
    for (const article of articles) {
      const related = getRelatedArticles(article);
      expect(related.every((item) => item.slug !== article.slug)).toBe(true);
      expect(related.every((item) => Boolean(getArticle(item.slug)))).toBe(true);
    }
  });

  it("검색 대상 텍스트에 제목과 본문이 함께 포함된다", () => {
    const article = articles[0];
    const searchable = getSearchableText(article);
    expect(searchable).toContain(article.title.toLowerCase());
    expect(searchable).toContain(article.sections[0].paragraphs[0].toLowerCase());
  });
});
