import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import About from "@/pages/About";
import ArticleList from "@/pages/ArticleList";
import ArticlePage from "@/pages/ArticlePage";
import Calculators from "@/pages/Calculators";
import CategoryPage from "@/pages/CategoryPage";
import NotFound from "@/pages/NotFound";
import SearchPage from "@/pages/SearchPage";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/articles"} component={ArticleList} />
      <Route path={"/articles/:slug"} component={ArticlePage} />
      <Route path={"/category/:slug"} component={CategoryPage} />
      <Route path={"/search"} component={SearchPage} />
      <Route path={"/calculators"} component={Calculators} />
      <Route path={"/about"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
