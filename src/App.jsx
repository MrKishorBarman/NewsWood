import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import News from './components/News.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Routes>
          {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map(category => (
            <Route
              key={category}
              path={`/${category}`}  
              element={<News setProgress={setProgress} category={category} />}
            />
          ))}
          <Route
            exact
            path="/"  
            element={<News setProgress={setProgress} key="General" category="general" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
