import React, { useState } from 'react';

const MeetingsView = ({ showToast }) => {
  const [inMeeting, setInMeeting] = useState(false);
  const [meetingTopic, setMeetingTopic] = useState('شرح ومراجعة مادة الفيزياء المتقدمة');

  const handleJoin = (topic) => {
    setMeetingTopic(topic);
    setInMeeting(true);
    if (showToast) {
      showToast(`جاري الانضمام إلى غرفة (${topic})... مرحباً بك! 🎥`);
    }
  };

  if (inMeeting) {
    return (
      <div style={{
        backgroundColor: '#0b101d',
        borderRadius: '24px',
        padding: '30px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '75vh'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>● بث مباشر نشط</span>
            <h2 style={{ fontSize: '22px', color: '#fde047', margin: '4px 0 0 0' }}>{meetingTopic}</h2>
          </div>
          <button 
            onClick={() => { setInMeeting(false); showToast('تم مغادرة الاجتماع بنجاح.'); }}
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
            }}
          >
            مغادرة الاجتماع 🚪
          </button>
        </div>

        {/* محاكاة شاشة الفيديو للبث */}
        <div style={{
          flex: 1,
          backgroundColor: '#111827',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '64px' }}>👨‍🏫 💻</div>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>المعلم يعرض الشاشة التفاعلية الآن...</p>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            display: 'flex',
            gap: '10px'
          }}>
            <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px' }}>🎙️ كتم الميكروفون</span>
            <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px' }}>📷 إيقاف الكاميرا</span>
            <span style={{ background: 'rgba(245,158,11,0.2)', color: '#fde047', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', border: '1px solid rgba(245,158,11,0.4)' }}>🙋‍♂️ طلب المداخلة</span>
          </div>
        </div>
      </div>
    );
  }

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
      
      {/* ترويسة القسم */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fde047', margin: '0 0 6px 0' }}>
          🎥 غرفة الاجتماعات الحية مع المعلم
        </h2>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
          انضم إلى البث المباشر أو المحاضرات التفاعلية واستفسر عن أي نقطة دراسية فوراً.
        </p>
      </div>

      {/* بطاقات الاجتماعات المتاحة */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                ● متاح الآن
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>👥 14 طالب متواجد</span>
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#ffffff', fontWeight: '700' }}>
              شرح ومراجعة مادة الفيزياء المتقدمة
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              المعلم: <strong style={{ color: '#fde047' }}>د. أحمد العبادي</strong>
            </p>
          </div>

          <button 
            onClick={() => handleJoin('شرح ومراجعة مادة الفيزياء المتقدمة')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f59e0b, #fde047)',
              color: '#070b14',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            الانضمام للاجتماع النشط 🚀
          </button>
        </div>

        <div style={{
          backgroundColor: '#111827',
          borderRadius: '18px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
          opacity: '0.85'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fde047', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                📅 جدول لاحق
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>الساعة 5:00 عصراً</span>
            </div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#ffffff', fontWeight: '700' }}>
              جلسة مناقشة مشروع شبكات الحاسوب
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              المعلم: <strong style={{ color: '#fde047' }}>أ. سارة خالد</strong>
            </p>
          </div>

          <button 
            onClick={() => showToast('هذا الاجتماع سيفتح في موعده المجدول قريباً.')}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            تذكير بالموعد ⏰
          </button>
        </div>

      </div>

    </div>
  );
};

export default MeetingsView;