import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './services/ProtectedRoute';

function AppContent() {
    const location = useLocation();
    const showNavbar = location.pathname === '/SignInPage' || location.pathname === '/SignUpPage';
  
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

export default AppContent;