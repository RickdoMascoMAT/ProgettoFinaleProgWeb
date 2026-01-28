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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
