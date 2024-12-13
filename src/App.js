// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import News from './components/News/News';
import BrandSlider from './components/Brand/BrandSlider';

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <News />
      <BrandSlider />
    </div>
  );
}

export default App;
