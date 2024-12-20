import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Banner from './components/Banner/Banner';
import Story from './components/Story/Story';
import MemberSlider from './components/Member/MemberSlider';
import News from './components/News/News';
import Vacancy from './components/Vacancy/Vacancy';
import VacancyList from './components/Vacancy/VacancyList';
import Footer from './components/Footer/Footer';
import ContentPage from './pages/ContentPage';
import NewsList from './components/News/NewsList';
import NewsDetail from './components/News/NewsDetail';
import StoryList from './components/Story/StoryList';
import StoryDetail from './components/Story/StoryDetail';
import MemberINGO from './pages/MemberINGO';
import SteeringCommittee from './pages/SteeringCommittee';
import SteeringCommitteeDetail from './pages/SteeringCommitteeDetail';
import HomePagePopup from './components/HomePagePopup/HomePagePopup';

const App = () => {
  const [stage, setStage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true); 
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    let timer;
    const stages = [1000, 2000, 2500];

    const updateStage = (currentStage) => {
      if (currentStage < stages.length) {
        timer = setTimeout(() => {
          setStage(currentStage + 1);
        }, stages[currentStage]);
      }
    };

    setStage(0);
    stages.forEach((_, index) => updateStage(index));

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <HelmetProvider>
      <div id="app">
        {isLoading && <Loader />}

        <Navbar />

        <main>
          {stage > 0 && location.pathname === '/' && <Banner />}
          {stage > 1 && (
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <HomePagePopup />
                    <Story />
                    <MemberSlider />
                    <News />
                    <Vacancy />
                  </div>
                }
              />
              <Route path="/pages/:slug" element={<ContentPage />} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/stories" element={<StoryList />} />
              <Route path="/story/:slug" element={<StoryDetail />} />
              <Route path="/members" element={<MemberINGO />} />
              <Route path="/vacancy" element={<VacancyList />} />
              <Route path="/steering-committee" element={<SteeringCommittee />} />
              <Route path="/steering-committee/:slug" element={<SteeringCommitteeDetail />} />
            </Routes>
          )}
        </main>

        {stage > 2 && <Footer />}
      </div>
    </HelmetProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
