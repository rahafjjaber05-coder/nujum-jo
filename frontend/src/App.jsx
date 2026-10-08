import React, { useState } from 'react';
import Auth from './pages/Auth/Auth';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import './App.css';

export default function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLogin = (role, data) => {
    setCurrentRole(role);
    setUserData(data);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setUserData(null);
  };

  return (
    <div className="web-app-wrapper">
      {!currentRole && <Auth onLogin={handleLogin} />}

      {currentRole === 'student' && (
        <StudentDashboard userData={userData} onLogout={handleLogout} />
      )}

      {currentRole === 'teacher' && (
        <TeacherDashboard userData={userData} onLogout={handleLogout} />
      )}

      {currentRole === 'admin' && (
        <AdminDashboard userData={userData} onLogout={handleLogout} />
      )}
    </div>
  );
}