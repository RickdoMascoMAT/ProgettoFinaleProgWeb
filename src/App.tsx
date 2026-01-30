import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <div
        className="app-container"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <main style={{ flex: 1, paddingBottom: '60px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '10px 0',
            borderTop: '1px solid #333',
            color: '#888',
            fontSize: '0.9em',
            backgroundColor: '#1a1a1a',
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0 }}>Hypixel SkyBlock Stats Tracker - Riccardo Mascotto - 2026</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85em' }}>Made for UF07WEB Exam</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
