import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { AuctionsPage } from './pages/AuctionsPage.tsx';

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
