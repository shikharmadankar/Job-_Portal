import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Components/components_lite/Navbar';
import Hero from './pages/Hero';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RecrutterDashboard from './pages/RecruiterDashboard';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Blogs from './pages/Blogs';
import Jobb from './pages/Jobb';
import Home from '../src/pages/Home';
import Profile from '../src/pages/Profile';
import ResumeDocuments from '../src/pages/ResumeDocuments';
import { ProtectedRoute, PublicRoute } from './Components/RouteGuards';
import SessionManager from './Components/SessionManager';


function Layout() {
  const location = useLocation();

  // Hide navbar on dashboards and profile
  const hideNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/recrutter_dashboard" ||
    location.pathname === "/profile" ||
    location.pathname === "/resume-documents";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <SessionManager />

      <Routes>
        {/* Public pages (accessible to everyone) */}
        <Route path="/" element={<Hero />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/home' element={<Home />} />
        <Route path='/jobb' element={<Jobb />} />
        <Route path='/aboutus' element={<AboutUs />} />

        {/* Auth pages — redirect to dashboard if already logged in */}
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Protected pages — redirect to login if NOT logged in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/recrutter_dashboard" element={
          <ProtectedRoute>
            <RecrutterDashboard />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/resume-documents' element={
          <ProtectedRoute>
            <ResumeDocuments />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}


const App = () => {
  return (
    <div>
     <Router>
      <Layout />
    </Router>
    </div>
  )
}

export default App
