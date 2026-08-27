import { describe, expect, it } from "vitest";
import { primaryMenuItems } from "./SiteHeader";

describe("생활비랩 primary navigation", () => {
  it("exposes the six official categories with unique routes", () => {
    expect(primaryMenuItems).toHaveLength(6);
    expect(primaryMenuItems.map((item) => item.label)).toEqual([
      "생활비·절약",
      "정부지원·복지",
      "자동차",
      "주거·가전",
      "여행·여가",
      "생활 계산기",
    ]);
    expect(new Set(primaryMenuItems.map((item) => item.href)).size).toBe(6);
    expect(primaryMenuItems.at(-1)?.href).toBe("/calculators");
  });
});
