/**
 * Design note — 여백의 생활편집실: 콘텐츠 화면은 필요할 때만 불러와 읽기 시작까지의 부담을 줄인다.
 */
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));
const ArticleList = lazy(() => import("./pages/ArticleList"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const Calculators = lazy(() => import("./pages/Calculators"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Contact = lazy(() => import("./pages/Contact"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const About = lazy(() => import("./pages/About"));

function PageLoading() { return <div className="route-loading" aria-live="polite"><span>페이지를 불러오는 중입니다.</span></div>; }
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/articles" component={ArticleList} /><Route path="/articles/:slug" component={ArticlePage} /><Route path="/category/:slug" component={CategoryPage} /><Route path="/search" component={SearchPage} /><Route path="/calculators" component={Calculators} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route path="/privacy" component={Privacy} /><Route path="/disclaimer" component={Disclaimer} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
function App() { return <ErrorBoundary><Suspense fallback={<PageLoading />}><Router /></Suspense></ErrorBoundary>; }
export default App;
