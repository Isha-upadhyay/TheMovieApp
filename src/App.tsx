import './App.css';
import './styles/landingPage.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/body.css'
import './styles/scrollList.css'
import './styles/cards.css'
import { BrowserRouter as Router, Route, redirect, Routes, createBrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import MovieDetails from './MovieDetails/TitleInfoLandingPage';
import MyProvider from './AppContext';
import TitleInfoLandingPage from './MovieDetails/TitleInfoLandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/movie/:movieID" element={<TitleInfoLandingPage />} />
      <Route path="/tv/:tvID" element={<TitleInfoLandingPage />} />
    </Routes>
  );
}

export default App;
