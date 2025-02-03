import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Gallery } from './components/Gallery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/p/:slug" element={<Gallery />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;