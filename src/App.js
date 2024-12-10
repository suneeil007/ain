// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import News from './components/News/News';

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <News />
    </div>
  );
}

export default App;
