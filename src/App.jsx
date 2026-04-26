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
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

/* Lazy-load pages for optimal bundle splitting (Efficiency) */
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Learn = lazy(() => import('./pages/Learn'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Checklist = lazy(() => import('./pages/Checklist'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

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
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <SkipLink targetId="main-content" />
          <Header />
          <main id="main-content" className="app__main" role="main" tabIndex={-1}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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
    </AuthProvider>
  );
}
