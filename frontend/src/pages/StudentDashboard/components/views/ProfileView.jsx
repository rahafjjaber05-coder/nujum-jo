import React from 'react';

export default function ProfileView({ student }) {
  return (
    <div style={{ 
      backgroundColor: '#0b101d', 
      borderRadius: '24px', 
      padding: '40px', 
      border: '1px solid rgba(245, 158, 11, 0.3)', 
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)', 
      maxWidth: '950px', 
      margin: '0 auto', 
      textAlign: 'right', 
      color: '#fff', 
      boxSizing: 'border-box',
      minHeight: '75vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      
      {/* رأس البروفايل مع الصورة الرمزية وتأثيرات الهوية */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '25px', 
        background: 'linear-gradient(135deg, #111827 0%, #0b101d 100%)', 
        padding: '30px', 
        borderRadius: '20px', 
        border: '1px solid rgba(245, 158, 11, 0.4)', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* خلفية جمالية خفيفة */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '150px',
          height: '150px',
          background: 'rgba(245, 158, 11, 0.08)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ 
          width: '90px', 
          height: '90px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #f59e0b, #fde047)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '2.8rem', 
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
          flexShrink: 0
        }}>
          👩‍🎓
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#fde047', fontSize: '1.8rem', margin: '0 0 6px 0', fontWeight: '900' }}>
            {student?.fullName || 'رهف'}
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>
            طالبة متميزة في منصة نُجُم التعليم | مسار البرمجة والتطوير الذكي
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span style={{ 
              background: 'rgba(34, 197, 94, 0.15)', 
              color: '#22c55e', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              fontWeight: 'bold'
            }}>
              ● نشط ومفعل برقم موثق ✨
            </span>
            <span style={{ 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: '#fde047', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontWeight: 'bold'
            }}>
              جامعة الزرقاء 🎓
            </span>
          </div>
        </div>
      </div>

      {/* شبكة البيانات التفصيلية */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div style={{ background: '#111827', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>الرقم الوطني / التعريفي</span>
          <h3 style={{ color: '#fff', fontSize: '1.15rem', margin: 0, fontWeight: '700' }}>{student?.nationalId || '9021456789'}</h3>
        </div>

        <div style={{ background: '#111827', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>المسار الأكاديمي</span>
          <h3 style={{ color: '#fff', fontSize: '1.15rem', margin: 0, fontWeight: '700' }}>تطوير البرمجيات والذكاء الاصطناعي</h3>
        </div>

        <div style={{ background: '#111827', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>الجهة التعليمية</span>
          <h3 style={{ color: '#fff', fontSize: '1.15rem', margin: 0, fontWeight: '700' }}>جامعة الزرقاء 🏛️</h3>
        </div>

        <div style={{ background: '#111827', padding: '22px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>حالة الحضور والتفاعل</span>
          <h3 style={{ color: '#22c55e', fontSize: '1.15rem', margin: 0, fontWeight: '700' }}>مستوى ممتاز ⭐ (100%)</h3>
        </div>

      </div>

      {/* قسم الإنجازات والشهادات الأكاديمية */}
      <div style={{ background: '#111827', padding: '25px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.25)', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        <h3 style={{ color: '#fde047', fontSize: '1.25rem', marginBottom: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏆 الإنجازات الأكاديمية والشهادات الاحترافية
        </h3>
        <ul style={{ paddingRight: '22px', margin: 0, color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.8' }}>
          <li>شهادة إتمام أساسيات الذكاء الاصطناعي وتحليل البيانات بكفاءة عالية (90%).</li>
          <li>المشاركة المتميزة وتصميم واجهات منصة "نُجُم التعليم" التفاعلية.</li>
          <li>تطوير وإنجاز مشاريع متقدمة في الويب وتطبيقات الذكاء الاصطناعي.</li>
        </ul>
      </div>

    </div>
  );
}