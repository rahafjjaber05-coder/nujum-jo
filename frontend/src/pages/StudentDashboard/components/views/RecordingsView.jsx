import React from 'react';

const RecordingsView = ({ showToast }) => {
  return (
    <div className="meetings-view-box">
      <h2>▶️ أرشيف الدروس المسجلة</h2>
      <p>مجموعة الحصص السابقة لمراجعتها في أي وقت.</p>
      <button 
        className="gold-primary-btn" 
        onClick={() => showToast('جاري تشغيل حصة الفيزياء المسجلة...')}
      >
        مشاهدة درس الفيزياء 🎬
      </button>
    </div>
  );
};

export default RecordingsView;