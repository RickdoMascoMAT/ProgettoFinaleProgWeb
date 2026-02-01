import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { AuctionsPage } from './pages/AuctionsPage.tsx';

/**
 * Main application component.
 * Sets up the React Router configuration with all available routes.
 *
 * Routes:
 * - '/' - Home page with player search and API key configuration
 * - '/profile/:username' - Player profile page with SkyBlock statistics
 * - '/auctions' - Auction house browser with search and filtering
 * - '*' - 404 Not Found page for unmatched routes
 *
 * @returns {JSX.Element} The application with routing configured
 */

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-container">
      <main className="main-content">
        <Routes key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <aside className="sidebar sidebar-always-visible">
        <h3>Navigation</h3>
        <div className="sidebar-buttons">
          <a href="/" className="sidebar-link">
            <button className="form-button sidebar-button sidebar-button-top">Stats Tracker</button>
          </a>
          <a href="/auctions" className="sidebar-link">
            <button className="form-button sidebar-button">Auction House</button>
          </a>
        </div>
      </aside>

      <footer className="app-footer">
        <p>Hypixel SkyBlock Stats Tracker - Riccardo Mascotto - 2026</p>
        <p className="footer-subtitle">Made for UF07WEB Exam</p>
      </footer>
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
