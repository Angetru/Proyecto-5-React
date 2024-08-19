// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import MedalList from './components/MedalList';

function App() {
  return (
    <Router>
    <ErrorBoundary>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<MedalList />} />
    </Routes>
    </ErrorBoundary>
    </Router>
  );

}

export default App;
