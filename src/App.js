import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Story from './components/Story/Story';
import MemberSlider from './components/Member/MemberSlider';
import News from './components/News/News';
import Vacancy from './components/Vacancy/Vacancy';
import Footer from './components/Footer/Footer';
import ContentPage from './pages/ContentPage';
import NewsList from './components/News/NewsList';
import NewsDetail from './components/News/NewsDetail';
import StoryList from './components/Story/StoryList';
import StoryDetail from './components/Story/StoryDetail';
import MemberINGO from './pages/MemberINGO';

function App() {
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showFooter, setShowFooter] = useState(false); 
  const location = useLocation();

  useEffect(() => {
   
    setLoading(true);
    setShowBanner(false);
    setShowContent(false);
    setShowFooter(false);

    
    setTimeout(() => {
      setLoading(false); 
    }, 0);

    
    if (location.pathname === '/') {
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }

    
    setTimeout(() => {
      setShowContent(true);
    }, 2000); 

   
    setTimeout(() => {
      setShowFooter(true);
    }, 2500);

   
    return () => {
      setLoading(false);
      setShowBanner(false);
      setShowContent(false);
      setShowFooter(false);
    };
  }, [location]);

  return (
    <HelmetProvider>
      <div id="app">
        <Navbar />

        <main>
    
          {showBanner && location.pathname === '/' && <Banner />}

          {showContent && (
            <Routes>
              <Route path="/" element={
                <div>
                  <Story />
                  <MemberSlider />
                  <News />
                  <Vacancy />
                </div>
              } />
              
              <Route path="/pages/:slug" element={<ContentPage />} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/stories" element={<StoryList />} />
              <Route path="/story/:slug" element={<StoryDetail />} />
              <Route path="/members" element={<MemberINGO />} />
            </Routes>
          )}
        </main>

    
        {showFooter && <Footer />}
      </div>
    </HelmetProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
