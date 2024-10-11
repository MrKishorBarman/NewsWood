import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import News from './components/News.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  let API = [
    "3b246ec8003c4bfa89e0c0b468b9a6fe", "a126c64fbfb6478087dc1dff983e50c0",
    "d28a80d0adc8491d97a3bf2ba0a34220",
    "77f3bc2f07c04011b318e2b4c2c0ea5c",
    "a126c64fbfb6478087dc1dff983e50c0"
  ]
  const apiKey = API[Math.floor(Math.random()*API.length)];
  const pageSize = 10;
  
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
          <Route
            exact
            path="/"
            element={<News setProgress={setProgress} apiKey={apiKey} key="General" pageSize={pageSize} country="in" category="General" />}
          />
          <Route
            exact
            path="/Business"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={pageSize} country="us" category="Business" />}
          />
          <Route
            exact
            path="/Entertainment"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country="us" category="Entertainment" />}
          />
          <Route
            exact
            path="/General"
            element={<News setProgress={setProgress} apiKey={apiKey} key="General" pageSize={pageSize} country="us" category="General" />}
          />
          <Route
            exact
            path="/Health"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={pageSize} country="us" category="Health" />}
          />
          <Route
            exact
            path="/Science"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={pageSize} country="us" category="Science" />}
          />
          <Route
            exact
            path="/Sports"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={pageSize} country="us" category="Sports" />}
          />
          <Route
            exact
            path="/Technology"
            element={<News setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={pageSize} country="us" category="Technology" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
