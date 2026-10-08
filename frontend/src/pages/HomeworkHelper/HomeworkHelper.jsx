import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { speakText } from '../../utils/speech';
import Toast from '../../components/Toast';
import './HomeworkHelper.css';

const HomeworkHelper = () => {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(1);
  const [toast, setToast] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [solution, setSolution] = useState(null);

  const handleHoverRead = (text) => speakText(text, volume);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSolveHomework = () => {
    if (!questionText.trim()) return;
    setSolution({
      explanation: 'قانون نيوتن الثاني ينص على أن القوة تساوي الكتلة مضروبة في التسارع (F = m × a).',
      steps: ['1. تحديد المعطيات (الكتلة والقوة)', '2. التعويض المباشر في القانون', '3. استخراج وحدة التسارع m/s²'],
      animation3D: 'شاهد تجسيد حركة الجسم في الكاميرا بالمنتصف 🎥'
    });
    showToast('تم تحليل الواجب وإصدار الحل الـ 3D بنجاح! ⭐');
  };

  return (
    <div className="homework-master-layout">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      {/* الشريط العلوي */}
      <header className="top-hw-bar glass-panel">
        <div className="hw-header-title" onMouseEnter={() => handleHoverRead('مساعد الواجبات والتمارين الذكي')}>
          <h2>📝 مساعد الواجبات الذكي (AI Homework Helper)</h2>
          <span>ارفع الواجب أو اكتب السؤال للحصول على حل تفاعلي ورسم 3D</span>
        </div>

        <div className="reader-audio-control">
          <span onMouseEnter={() => handleHoverRead('مستوى صوت القارئ الذكي')}>🔊 القارئ:</span>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        <button className="back-btn-gold" onClick={() => navigate('/student')}>← العودة للفضاء الرئيسي</button>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="hw-content-grid">
        <main className="hw-input-panel glass-panel">
          <h3 onMouseEnter={() => handleHoverRead('ادخل نص السؤال أو ارفق صورة الواجب')}>
            📷 إدخال الواجب المدرسي
          </h3>

          <textarea 
            placeholder="اكتب نص السؤال أو التمرين هنا..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <div className="hw-action-buttons">
            <input type="file" id="hw-file" hidden />
            <label htmlFor="hw-file" className="upload-btn-label">
              📁 رفع صورة الواجب / PDF
            </label>
            <button className="gold-btn-glow" onClick={handleSolveHomework}>
              حل وتجسيد الواجب 3D 🚀
            </button>
          </div>
        </main>

        {solution && (
          <aside className="hw-solution-panel glass-panel">
            <h3 onMouseEnter={() => handleHoverRead('الحول والخطوات التفصيلية')}>
              💡 الشرح والحل التفصيلي
            </h3>
            <p className="sol-explanation" onMouseEnter={() => handleHoverRead(solution.explanation)}>
              {solution.explanation}
            </p>
            <ul className="sol-steps">
              {solution.steps.map((step, idx) => (
                <li key={idx} onMouseEnter={() => handleHoverRead(step)}>{step}</li>
              ))}
            </ul>
            <div className="3d-callout glass-panel" onMouseEnter={() => handleHoverRead(solution.animation3D)}>
              🎬 {solution.animation3D}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default HomeworkHelper;