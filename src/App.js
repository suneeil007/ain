// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Story from './components/Story/Story';
import BrandSlider from './components/Brand/BrandSlider';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import ContentPage from './pages/ContentPage';
import NewsList from './components/News/NewsList';
import NewsDetail from './components/News/NewsDetail';

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
              <BrandSlider />
              <News />
            </div>
          } />
          
          <Route path="/pages/:slug" element={<ContentPage />} />

          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
