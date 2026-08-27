/**
 * Design note — 생활비랩: 여섯 공식 분야를 데스크톱에서는 한 줄로 보여 주고,
 * 좁은 화면에서는 햄버거 메뉴로 접어 탐색 부담을 낮춘다.
 */
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export const primaryMenuItems = [
  { href: "/category/living-cost", label: "생활비·절약" },
  { href: "/category/welfare", label: "정부지원·복지" },
  { href: "/category/car", label: "자동차" },
  { href: "/category/housing-appliance", label: "주거·가전" },
  { href: "/category/travel-leisure", label: "여행·여가" },
  { href: "/calculators", label: "생활 계산기" },
];

export function SiteHeader() {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const goToSearch = (keyword: string) => {
    const normalized = keyword.trim();
    if (!normalized) return;
    setLocation(`/search?q=${encodeURIComponent(normalized)}`);
    setIsSearchOpen(false);
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToSearch(query);
  };

  const isActive = (href: string) => location.startsWith(href);

  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" href="/" aria-label="생활비랩 홈">
            <img
              className="brand__mark"
              src="/manus-storage/trusted-life-guide-mark_0491c4bb.png"
              alt="생활비랩 심볼"
            />
            <span className="brand__copy">
              <strong>생활비랩</strong>
              <em>생활비 절약 정보</em>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            {primaryMenuItems.map((item) => (
              <Link
                key={item.href}
                className={isActive(item.href) ? "active" : ""}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <button
              className="search-trigger"
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="사이트 검색 열기"
            >
              <Search size={20} />
              <span>검색</span>
            </button>
            <button
              className="menu-trigger"
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-primary-nav"
            >
              {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav id="mobile-primary-nav" className="mobile-nav" aria-label="모바일 주요 메뉴">
            {primaryMenuItems.map((item) => (
              <Link
                key={item.href}
                className={isActive(item.href) ? "active" : ""}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <Search size={18} />
              생활정보 검색하기
            </button>
          </nav>
        )}
      </header>

      {isSearchOpen && (
        <div className="search-layer" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <div className="search-layer__panel">
            <div className="search-layer__header">
              <p className="eyebrow">생활정보 검색</p>
              <button type="button" onClick={() => setIsSearchOpen(false)} aria-label="검색 닫기">
                <X size={24} />
              </button>
            </div>
            <h2 id="search-title">무엇을 찾고 계신가요?</h2>
            <p>생활비, 기초연금, 엔진오일, 에어컨처럼 기억나는 단어를 입력해 보세요.</p>
            <form onSubmit={submitSearch} className="search-form">
              <Search size={22} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="예: 한 달 생활비, 기초연금"
                aria-label="검색어"
              />
              <button type="submit">찾기</button>
            </form>
            <div className="search-suggestions">
              <span>추천 검색어</span>
              <button type="button" onClick={() => goToSearch("한 달 생활비")}>한 달 생활비</button>
              <button type="button" onClick={() => goToSearch("기초연금")}>기초연금</button>
              <button type="button" onClick={() => goToSearch("엔진오일")}>엔진오일</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
