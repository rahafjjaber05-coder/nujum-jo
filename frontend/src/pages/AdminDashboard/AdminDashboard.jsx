import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { speakText } from '../../utils/speech';
import Toast from '../../components/Toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(1);
  const [toast, setToast] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');

  const handleHoverRead = (text) => speakText(text, volume);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="web-app-wrapper">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <header className="global-web-navbar">
        <div className="navbar-left">
          <div className="brand-logo" onMouseEnter={() => handleHoverRead('منصة نجوم التعليم')}>
            ⭐ <span>نجوم التعليم</span>
          </div>
          <div className="user-welcome" onMouseEnter={() => handleHoverRead('لوحة الإدارة المدرسية')}>
            <strong>لوحة التحكم والإدارة المدرسية 🏛️</strong>
            <span>مديرية التربية والتعليم</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="volume-slider-box">
            <span onMouseEnter={() => handleHoverRead('صوت القارئ الذكي')}>🔊 القارئ</span>
            <input 
              type="range" min="0" max="1" step="0.1" 
              value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          <button className="web-logout-btn" onClick={() => navigate('/')}>خروج 🚪</button>
        </div>
      </header>

      <div className="global-workspace-container admin-grid">
        <div className="admin-stats-row">
          <div className="stat-card">
            <h4>إجمالي الطلاب</h4>
            <h2>1,240</h2>
            <span>نسبة الحضور اليوم 95.8%</span>
          </div>
          <div className="stat-card">
            <h4>الكادر التعليمي</h4>
            <h2>68</h2>
            <span>معلم ومعلمة</span>
          </div>
          <div className="stat-card">
            <h4>الدروس الحية اليوم</h4>
            <h2>32</h2>
            <span>بث مباشر نشط</span>
          </div>
        </div>

        <div className="admin-content-box">
          <h3>📢 نشر إعلان رسمي للمدرسة</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            if(!announcementText) return;
            showToast('تم نشر الإعلان الرسمي لجميع الطلاب والمعلمين! 🔔');
            setAnnouncementText('');
          }}>
            <textarea 
              placeholder="اكتب نص الإعلان الموجه للطلاب والمعلمين هنا..." 
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              rows="4"
              required
            ></textarea>
            <button type="submit" className="stage-btn-primary">نشر الإعلان للجميع 🚀</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;