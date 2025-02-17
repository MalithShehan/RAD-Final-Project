import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/custom/protected-route/ProtectedRoute';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Click me</h1>} />
          <Route  element={<ProtectedRoute />}>
            <Route path=":id" element={<h1>Detail</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
