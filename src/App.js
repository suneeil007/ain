// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Story from './components/Story/Story';
import MemberSlider from './components/Member/MemberSlider';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import ContentPage from './pages/ContentPage';
import NewsList from './components/News/NewsList';
import NewsDetail from './components/News/NewsDetail';
import StoryList from './components/Story/StoryList';
import StoryDetail from './components/Story/StoryDetail';

function App() {
  return (
    <Router> 
      <div>
        <Navbar />
        <Routes>
        
          <Route path="/" element={
            <div>
              <Banner />
              <Story />
              <MemberSlider />
              <News />
            </div>
          } />
          
          <Route path="/pages/:slug" element={<ContentPage />} />

          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:slug" element={<NewsDetail />} />

          <Route path="/stories" element={<StoryList />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
