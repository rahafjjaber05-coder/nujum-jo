import React from 'react';

const Logo3D = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
      {/* هالة ضوئية ذهبية خلف الصورة */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
        filter: 'blur(20px)',
        zIndex: 1
      }}></div>

      {/* صورة الشعار المباشرة من مجلد public */}
      <img 
        src="/star-pixel.png" 
        alt="شعار نجوم التعليم" 
        style={{
          width: '80px',
          height: 'auto',
          position: 'relative',
          zIndex: 2,
          filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))'
        }}
      />
      
      <div style={{
        marginTop: '8px',
        fontSize: '0.75rem',
        color: '#F5F5DC',
        background: 'rgba(212, 175, 55, 0.12)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '2px 10px',
        borderRadius: '20px',
        position: 'relative',
        zIndex: 2
      }}>
        المملكة الأردنية الهاشمية 🇯🇴
      </div>
    </div>
  );
};

export default Logo3D;