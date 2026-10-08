import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [lang, setLang] = useState('ar');
  const [isReading, setIsReading] = useState(false);
  const [loginRole, setLoginRole] = useState('student');

  const translations = {
    ar: {
      appName: 'نُجُم التعليم',
      welcome: 'مرحباً بك في نُجُم التعليم',
      subtitle: 'طريق المستقبل، لطلاب الغد',
      admin: 'إدارة',
      teacher: 'معلم',
      student: 'طالب',
      fullName: 'الاسم الرباعي',
      nationalId: 'الرقم الوطني',
      password: 'كلمة المرور',
      forgotPass: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني',
      signIn: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟ ',
      joinNow: 'انضم إلينا الآن',
      fillAll: 'الرجاء تعبئة جميع الحقول المطلوبة',
      stopReading: 'إيقاف القراءة',
      audioActive: 'القراءة التلقائية مفعلة',
      langBtn: 'English 🌐'
    },
    en: {
      appName: 'Nujum Education',
      welcome: 'Welcome to Nujum Education',
      subtitle: 'The path of the future, for tomorrow students',
      admin: 'Admin',
      teacher: 'Teacher',
      student: 'Student',
      fullName: 'Full Name',
      nationalId: 'National ID',
      password: 'Password',
      forgotPass: 'Forgot password?',
      rememberMe: 'Remember me',
      signIn: 'Sign In',
      noAccount: "Don't have an account? ",
      joinNow: 'Join us now',
      fillAll: 'Please fill in all required fields',
      stopReading: 'Stop Reading',
      audioActive: 'Hover Audio Active',
      langBtn: '🌐 العربية'
    }
  };

  const t = translations[lang];

  const roleCredentials = {
    student: {
      fullName: lang === 'ar' ? 'رهف جبر أحمد جابر' : 'Rahaf Jaber Ahmed Jaber',
      nationalId: '202304370',
      password: '123'
    },
    teacher: {
      fullName: lang === 'ar' ? 'أ. محمد الرفاعي' : 'Mr. Mohammad Al-Refai',
      nationalId: '199882211',
      password: '123'
    },
    admin: {
      fullName: lang === 'ar' ? 'مدير النظام العام' : 'General System Admin',
      nationalId: '100000000',
      password: '123'
    }
  };

  const [fullName, setFullName] = useState(roleCredentials.student.fullName);
  const [nationalId, setNationalId] = useState(roleCredentials.student.nationalId);
  const [password, setPassword] = useState(roleCredentials.student.password);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (role) => {
    setLoginRole(role);
    setFullName(roleCredentials[role].fullName);
    setNationalId(roleCredentials[role].nationalId);
    setPassword(roleCredentials[role].password);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = 1.0;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !nationalId || !password) {
      alert(t.fillAll);
      return;
    }
    
    if (onLogin) {
      onLogin(loginRole, { 
        fullName, 
        nationalId,
        role: loginRole 
      });
    }
  };

  return (
    <div style={styles.appContainer} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <style>{customStyles}</style>

      <div className="auth-split-container fade-in-transition">
        <div className="auth-right-form-section">
          <div className="top-bar-controls">
            <button 
              className="lang-switch-btn" 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
              type="button"
              onMouseEnter={() => speakText(lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية')}
            >
              {t.langBtn}
            </button>
            
            <button 
              className="audio-reader-btn" 
              onClick={stopSpeech} 
              type="button"
              onMouseEnter={() => speakText(t.audioActive)}
            >
              🔊 {isReading ? t.stopReading : t.audioActive}
            </button>
          </div>

          <div className="form-wrapper">
            <div className="form-brand-header animated-glow-brand" onMouseEnter={() => speakText(t.appName)}>
              <span className="star-icon animated-star-pulse">⭐</span>
              <h2 className="animated-text-glow">{t.appName}</h2>
            </div>

            <div className="login-header-text" onMouseEnter={() => speakText(t.welcome)}>
              <h2>{t.welcome}</h2>
              <p>{t.subtitle}</p>
            </div>

            <div className="role-tabs">
              <button 
                type="button"
                className={`role-tab ${loginRole === 'admin' ? 'active' : ''}`}
                onClick={() => handleRoleChange('admin')}
                onMouseEnter={() => speakText(t.admin)}
              >
                {t.admin}
              </button>
              <button 
                type="button"
                className={`role-tab ${loginRole === 'teacher' ? 'active' : ''}`}
                onClick={() => handleRoleChange('teacher')}
                onMouseEnter={() => speakText(t.teacher)}
              >
                {t.teacher}
              </button>
              <button 
                type="button"
                className={`role-tab ${loginRole === 'student' ? 'active' : ''}`}
                onClick={() => handleRoleChange('student')}
                onMouseEnter={() => speakText(t.student)}
              >
                {t.student}
              </button>
            </div>

            <form className="actual-login-form" onSubmit={handleLoginSubmit}>
              <div className="input-group" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }} onMouseEnter={() => speakText(t.fullName)}>
                <label>{t.fullName}</label>
                <input 
                  type="text" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>

              <div className="input-group" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }} onMouseEnter={() => speakText(t.nationalId)}>
                <label>{t.nationalId}</label>
                <input 
                  type="text" 
                  value={nationalId} 
                  onChange={(e) => setNationalId(e.target.value)} 
                />
              </div>

              <div className="input-group" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }} onMouseEnter={() => speakText(t.password)}>
                <label>{t.password}</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>

              <div className="form-extra-options">
                <a href="#forgot" className="forgot-pass" onClick={(e) => e.preventDefault()} onMouseEnter={() => speakText(t.forgotPass)}>
                  {t.forgotPass}
                </a>
                <label className="remember-me-label" onMouseEnter={() => speakText(t.rememberMe)}>
                  <span>{t.rememberMe}</span>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                </label>
              </div>

              <button type="submit" className="submit-login-btn" onMouseEnter={() => speakText(t.signIn)}>
                {t.signIn}
              </button>
            </form>

            <div className="signup-prompt" onMouseEnter={() => speakText(t.noAccount + t.joinNow)}>
              <span>{t.noAccount}</span>
              <a href="#signup" onClick={(e) => e.preventDefault()}>{t.joinNow}</a>
            </div>
          </div>
        </div>

        <div className="auth-left-banner"></div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Cairo', sans-serif",
    backgroundColor: '#0c101d',
    color: '#ffffff',
    overflow: 'hidden'
  }
};

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in-transition {
    animation: fadeIn 0.4s ease-out forwards;
  }

  @keyframes starPulse {
    0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(251,191,36,0.5)); }
    50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(251,191,36,0.9)); }
    100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(251,191,36,0.5)); }
  }

  .animated-star-pulse {
    animation: starPulse 2.5s ease-in-out infinite;
    display: inline-block;
  }

  .auth-split-container {
    display: flex;
    width: 100%;
    height: 100vh;
  }

  /* تم تكبير عرض مربع تسجيل الدخول ليكون أكثر أريحية واحترافية */
  .auth-right-form-section {
    width: 530px;
    background-color: #0c101d;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 45px;
    box-sizing: border-box;
    overflow-y: auto;
    box-shadow: 5px 0 25px rgba(0,0,0,0.5);
    z-index: 2;
  }

  .top-bar-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .audio-reader-btn, .lang-switch-btn {
    background: #151b2b;
    color: #94a3b8;
    border: 1px solid #1e293b;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    transition: 0.2s;
  }

  .audio-reader-btn:hover, .lang-switch-btn:hover {
    border-color: #fbbf24;
    color: #fbbf24;
  }

  /* توسيع محتوى النموذج ليتناسب مع الحاوية الأكبر */
  .form-wrapper {
    max-width: 440px;
    margin: 0 auto;
    width: 100%;
  }

  .form-brand-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 10px;
    background: rgba(251, 191, 36, 0.03);
    border-radius: 14px;
    border: 1px solid rgba(251, 191, 36, 0.15);
  }

  .star-icon {
    font-size: 28px;
    color: #fbbf24;
  }

  .form-brand-header h2 {
    color: #fbbf24;
    font-size: 24px;
    margin: 0;
    font-weight: 700;
  }

  .login-header-text {
    text-align: center;
    margin-bottom: 20px;
  }

  .login-header-text h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #fff;
  }

  .login-header-text p {
    color: #64748b;
    font-size: 13px;
    margin: 0;
  }

  .role-tabs {
    display: flex;
    background: #131b2e;
    padding: 5px;
    border-radius: 12px;
    margin-bottom: 20px;
    gap: 6px;
  }

  .role-tab {
    flex: 1;
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 9px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 9px;
    cursor: pointer;
    transition: 0.3s;
  }

  .role-tab.active {
    background: #fbbf24;
    color: #0c101d;
    box-shadow: 0 4px 15px rgba(251,191,36,0.35);
  }

  .actual-login-form .input-group {
    margin-bottom: 16px;
  }

  .actual-login-form label {
    display: block;
    color: #fbbf24;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .actual-login-form input[type="text"],
  .actual-login-form input[type="password"] {
    width: 100%;
    padding: 12px 14px;
    background: #131b2e;
    border: 1px solid #1e293b;
    border-radius: 10px;
    color: #fff;
    box-sizing: border-box;
    font-size: 14px;
    transition: border-color 0.2s;
  }

  .actual-login-form input[type="text"]:focus,
  .actual-login-form input[type="password"]:focus {
    border-color: #fbbf24;
    outline: none;
  }

  .form-extra-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .forgot-pass {
    color: #94a3b8;
    text-decoration: none;
    font-size: 13px;
  }

  .forgot-pass:hover {
    color: #fbbf24;
  }

  .remember-me-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #94a3b8;
    font-size: 13px;
    cursor: pointer;
  }

  .submit-login-btn {
    width: 100%;
    background: #fbbf24;
    color: #0c101d;
    border: none;
    padding: 13px;
    font-weight: 700;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    box-shadow: 0 4px 20px rgba(251,191,36,0.3);
    transition: transform 0.2s, background-color 0.2s;
  }

  .submit-login-btn:hover {
    background: #f59e0b;
    transform: translateY(-1px);
  }

  .signup-prompt {
    text-align: center;
    margin-top: 20px;
    font-size: 13px;
    color: #64748b;
  }

  .signup-prompt a {
    color: #fbbf24;
    text-decoration: none;
    font-weight: 600;
  }

  .auth-left-banner {
    flex: 1;
    background: url('/hero-bg.jpg') center/cover no-repeat;
    position: relative;
    border-right: 1px solid #1e293b;
  }
`;