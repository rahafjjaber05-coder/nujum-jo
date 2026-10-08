import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { speakText } from '../../utils/speech';
import Toast from '../../components/Toast';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(1);
  const [toast, setToast] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  
  // حالة الإضاءة التحفيزية الحية الخاصة بالمعلم
  const teacherQuotes = [
    "رسالتك السامية تصنع أجيالاً تبني المستقبل بكل فخر ✨",
    "عطاء المعلم لا يُقدر بثمن.. أنتِ قدوة الإبداع يا رهف 💛",
    "كل طالب ينجح هو ثمرة لجهودك العظيمة وصبرك المستمر 🚀",
    "خذي استراحة قصيرة، فنجان قهوتك الدافئ ينتظركِ ☕"
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);

  // بيانات تجريبية للطلاب والغياب
  const [classesList, setClassesList] = useState([
    { 
      className: 'الصف العاشر (أ)', 
      students: [
        { id: 1, name: 'سارة خالد', status: 'حاضر', absences: 0 },
        { id: 2, name: 'محمد علي', status: 'حاضر', absences: 1 },
        { id: 3, name: 'أحمد محمود', status: 'غائب', absences: 3 }
      ] 
    }
  ]);

  const handleHoverRead = (text) => speakText(text, volume);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleInspireClick = () => {
    const nextIdx = (quoteIdx + 1) % teacherQuotes.length;
    setQuoteIdx(nextIdx);
    showToast('✨ تم تجديد الإضاءة التحفيزية للمعلم!');
  };

  return (
    <div className="student-layout">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <header className="student-navbar">
        <div className="brand-box" onMouseEnter={() => handleHoverRead('منصة نجوم التعليم - لوحة تحكم المعلم')}>
          <span className="star-icon">⭐</span>
          <div>
            <h3>نجوم التعليم</h3>
            <span>لوحة المعلم والإدارة الذكية</span>
          </div>
        </div>

        <div className="audio-controls-box">
          <span onMouseEnter={() => handleHoverRead('القارئ الصوتي')}>🔊 القارئ:</span>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        <button className="exit-btn" onClick={() => navigate('/')}>خروج 🚪</button>
      </header>

      <div className="student-workspace" style={{ gap: '25px' }}>
        
        {/* الشريط الجانبي الأيمن: الإضاءة التحفيزية الحية وإدارة الصفوف والطلاب */}
        <aside className="student-sidebar" style={{ width: '310px' }}>
          
          {/* مربع النصوص التحفيزية التفاعلي الجديد */}
          <div 
            onClick={handleInspireClick}
            title="اضغطي هنا لتجديد الإضاءة التحفيزية!"
            style={{ 
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))', 
              border: '1px solid rgba(245, 158, 11, 0.4)', 
              borderRadius: '16px', 
              padding: '16px', 
              textAlign: 'center', 
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🌱</div>
            <div style={{ color: '#fde047', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '4px' }}>إضاءة تحفيزية للمعلم</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: '1.4' }}>
              {teacherQuotes[quoteIdx]}
            </div>
            <div style={{ color: '#f59e0b', fontSize: '0.7rem', marginTop: '8px' }}>اضغطي للتجديد ✨</div>
          </div>

          <div className="section-block">
            <h4 onMouseEnter={() => handleHoverRead('إدارة الصفوف والطلاب')}>🏫 الصفوف والطلاب</h4>
            <div className="add-box" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <input 
                type="text" 
                placeholder="اسم الصف الجديد..." 
                value={newClassName} 
                onChange={(e) => setNewClassName(e.target.value)} 
                style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(245,158,11,0.3)', color: '#fff' }}
              />
              <button className="send-gold-btn" onClick={() => {
                if(!newClassName) return;
                setClassesList([...classesList, { className: newClassName, students: [] }]);
                setNewClassName('');
                showToast('تمت إضافة الصف بنجاح!');
              }}>إضافة ➕</button>
            </div>
          </div>

          <div className="section-block" style={{ marginTop: '20px' }}>
            <h4 onMouseEnter={() => handleHoverRead('سجل الحضور والغيابات التلقائي')}>📋 سجل الحضور والغياب</h4>
            {classesList.map((cls, idx) => (
              <div key={idx} className="class-group-card" style={{ marginTop: '10px' }}>
                <h5 style={{ color: '#fde047', marginBottom: '8px' }}>{cls.className}</h5>
                {cls.students.map((st) => (
                  <div key={st.id} className="teacher-st-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                    <span>{st.name}</span>
                    <span className={`pill ${st.status === 'حاضر' ? 'pres' : 'abs'}`}>{st.status}</span>
                    <span className="abs-count" style={{ color: '#94a3b8', fontSize: '0.8rem' }}>غياب: {st.absences}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* المنتصف: استوديو المكالمة والفيديو وبدء البث مع الطلاب */}
        <main className="student-center-stage" style={{ flex: 1 }}>
          <div className="camera-3d-viewport" style={{ minHeight: '380px' }}>
            <div className="live-tag">{isCallActive ? '🔴 مكالمة الفيديو نشطة مع الطلاب' : '📹 غرفة البث والمكالمات'}</div>
            <div className="virtual-screen-placeholder" style={{ textAlign: 'center', padding: '40px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>{isCallActive ? 'غرفة المكالمة التفاعلية تعمل الآن' : 'ابدأ مكالمة الفيديو المرئية مع طلابك'}</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>شرح الدروس بالصوت والصورة ومشاركة اللوحة التفاعلية بثقة واحترافية</p>
              <button 
                className={`call-control-btn ${isCallActive ? 'end-call' : 'start-call'}`}
                onClick={() => {
                  setIsCallActive(!isCallActive);
                  showToast(isCallActive ? 'تم إنهاء المكالمة' : 'تم بدء مكالمة الفيديو بنجاح! 🎥');
                }}
                style={{
                  background: isCallActive ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #f59e0b, #fde047)',
                  color: isCallActive ? '#fff' : '#070b14',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
                }}
              >
                {isCallActive ? 'إنهاء المكالمة المرئية 🛑' : 'بدء مكالمة فيديو مع الطلاب 🎥'}
              </button>
            </div>
          </div>

          {/* لوحة إعلانات المدرسة والمناسبات */}
          <div className="announcement-board" style={{ marginTop: '20px' }}>
            <h4 onMouseEnter={() => handleHoverRead('إعلانات المدرسة والمناسبات')}>📢 إعلانات المدرسة والمناسبات الرسمية</h4>
            <p style={{ color: '#e2e8f0', marginTop: '8px', lineHeight: '1.6' }}>🌟 تم تفعيل احتفالات يوم الاستقلال الأردني وتكريم الطلاب المتفوقين يوم الخميس القادم في مسرح المدرسة.</p>
          </div>
        </main>

        {/* الجانب الأيسر: الواجبات والأنشطة */}
        <aside className="student-sidebar" style={{ width: '280px' }}>
          <div className="section-block">
            <h4 onMouseEnter={() => handleHoverRead('إرسال الواجبات')}>📤 إرسال الواجبات</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <input type="text" placeholder="عنوان الواجب..." style={{ padding: '12px', borderRadius: '12px', background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(245,158,11,0.3)', color: '#fff' }} />
              <textarea placeholder="تعليمات الواجب للطلاب..." rows="4" style={{ padding: '12px', borderRadius: '12px', background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(245,158,11,0.3)', color: '#fff', resize: 'none' }}></textarea>
              <button className="send-gold-btn" onClick={() => showToast('تم نشر الواجب لجميع الطلاب بنجاح! 🎯')} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #fde047)', color: '#070b14', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>نشر الواجب للطلاب 🚀</button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default TeacherDashboard;