/**
 * App Component
 *
 * Root application component with routing, layout, and error boundary.
 *
 * @component
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SkipLink from './components/Layout/SkipLink';
import LoadingSpinner from './components/ui/LoadingSpinner';
import './App.css';

/* Lazy-load pages for optimal bundle splitting (Efficiency) */
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Learn = lazy(() => import('./pages/Learn'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Checklist = lazy(() => import('./pages/Checklist'));

/** Page loading fallback component */
function PageLoader() {
  return (
    <div className="page-loader">
      <LoadingSpinner size="lg" label="Loading page..." />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <SkipLink targetId="main-content" />
        <Header />
        <main id="main-content" className="app__main" role="main" tabIndex={-1}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/checklist" element={<Checklist />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
