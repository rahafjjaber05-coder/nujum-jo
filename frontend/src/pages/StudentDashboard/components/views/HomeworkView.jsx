import React, { useState } from 'react';

const HomeworkView = ({ showToast }) => {
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: 'واجب الفيزياء التفاعلي - حل مسائل التوجيهي',
      course: 'الفيزياء المتقدمة',
      deadline: 'غداً، الساعة 8:00 مساءً',
      status: 'قيد الانتظار',
      submittedFile: null
    },
    {
      id: 2,
      title: 'مشروع شبكات الحاسوب وتوجيه البيانات',
      course: 'أمن الشبكات',
      deadline: 'بعد 3 أيام',
      status: 'مطلوب',
      submittedFile: null
    }
  ]);

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setHomeworkList(prev => prev.map(hw => {
        if (hw.id === id) {
          return { ...hw, submittedFile: file.name, status: 'تم التسليم' };
        }
        return hw;
      }));
      if (showToast) {
        showToast(`تم رفع الملف (${file.name}) وتسليم الواجب بنجاح! 🎉`);
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#0b101d',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      width: '100%',
      boxSizing: 'border-box',
      minHeight: '75vh'
    }}>
      
      {/* الترويسة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fde047', margin: '0 0 6px 0' }}>
            📝 الواجبات والمهمات الدراسية
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
            تابع مهامك اليومية، وارفع حلولك البرمجية والدراسية بكل سهولة.
          </p>
        </div>
      </div>

      {/* قائمة الواجبات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {homeworkList.map((hw) => (
          <div key={hw.id} style={{
            backgroundColor: '#111827',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            transition: 'transform 0.2s ease',
          }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(245, 158, 11, 0.15),',
                  color: '#fde047',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: 'bold'
                }}>
                  {hw.course}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: hw.status === 'تم التسليم' ? '#22c55e' : '#f97316',
                  fontWeight: 'bold'
                }}>
                  ● {hw.status}
                </span>
              </div>

              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#ffffff', fontWeight: '700' }}>
                {hw.title}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                ⏳ متبقي للتسليم: <strong style={{ color: '#fde047' }}>{hw.deadline}</strong>
              </p>
              {hw.submittedFile && (
                <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#22c55e' }}>
                  📎 الملف المرفق: {hw.submittedFile}
                </p>
              )}
            </div>

            {/* زر رفع الواجب الاحترافي */}
            <div style={{ position: 'relative', width: '100%', marginTop: '8px' }}>
              <input 
                type="file" 
                onChange={(e) => handleFileUpload(hw.id, e)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  zIndex: 2
                }}
              />
              <button 
                style={{
                  width: '100%',
                  background: hw.status === 'تم التسليم' 
                    ? 'linear-gradient(135deg, #166534, #22c55e)' 
                    : 'linear-gradient(135deg, #f59e0b, #fde047)',
                  color: hw.status === 'تم التسليم' ? '#ffffff' : '#070b14',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                {hw.status === 'تم التسليم' ? '✅ تم التسليم بنجاح (تحديث الملف)' : '📤 رفع وتسليم الواجب'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default HomeworkView;