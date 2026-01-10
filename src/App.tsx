import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {HomePage} from "./pages/HomePage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
          <nav>
              <a href="/">Home</a> | <a href="profile">Profile</a>
          </nav>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
