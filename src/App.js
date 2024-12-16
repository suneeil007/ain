// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Story from './components/Story/Story';
import BrandSlider from './components/Brand/BrandSlider';
import News from './components/News/News';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Story />
      <BrandSlider />
      <News />
      <Footer/>
    </div>
  );
}

export default App;
