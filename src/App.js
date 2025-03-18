import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import ChatPage from './ChatPage';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/ChatPage';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/ChatPage" element={ <ProtectedRoute> <ChatPage /> </ProtectedRoute>}/>

        <Route path="/" element={<Navigate replace to="/SignInPage" />} />
      </Routes>
    </div>
  );
}

export default App;
