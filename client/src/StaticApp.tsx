/**
 * Cloudflare Pages용 정적 사전 렌더링 전용 라우터입니다.
 * 브라우저용 App.tsx의 지연 로딩과 분리해, 빌드 결과 HTML에 실제 본문을 포함합니다.
 */
import { Route, Switch } from "wouter";
import About from "./pages/About";
import ArticleList from "./pages/ArticleList";
import ArticlePage from "./pages/ArticlePage";
import Calculators from "./pages/Calculators";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import SearchPage from "./pages/SearchPage";
import Terms from "./pages/Terms";

export default function StaticApp() { return <Switch><Route path="/" component={Home} /><Route path="/articles" component={ArticleList} /><Route path="/articles/:slug" component={ArticlePage} /><Route path="/category/:slug" component={CategoryPage} /><Route path="/search" component={SearchPage} /><Route path="/calculators" component={Calculators} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route path="/privacy" component={Privacy} /><Route path="/terms" component={Terms} /><Route path="/disclaimer" component={Disclaimer} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
