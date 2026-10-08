import React, { useRef, useState, useEffect } from 'react';

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("خطأ في تشغيل الكاميرا:", err);
        alert("تعذر الوصول للكاميرا. تأكدي من إعطاء الصلاحيات للمتصفح.");
      }
    }
    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takeSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);
    
    // إيقاف الكاميرا وإرسال الصورة للـ Parent
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (onCapture) onCapture(imageDataUrl);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid rgba(250,204,21,0.3)' }}>
      {!capturedImage ? (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '280px', borderRadius: '12px', backgroundColor: '#000' }} />
          <div style={{ marginTop: '14px' }}>
            <button 
              onClick={takeSnapshot}
              style={{ background: 'linear-gradient(135deg, #facc15, #fef08a)', color: '#000', border: 'none', padding: '12px 28px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              📸 التقاط الصورة للصفحة الدراسية
            </button>
          </div>
        </div>
      ) : (
        <div>
          <img src={capturedImage} alt="Captured" style={{ width: '100%', maxHeight: '260px', borderRadius: '12px', objectFit: 'contain' }} />
          <p style={{ color: '#fef08a', fontSize: '13px', margin: '10px 0' }}>تم التقاط الصفحة بنجاح وجاهزة للتحليل الذكي!</p>
          <button 
            onClick={() => setCapturedImage(null)}
            style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer' }}
          >
            إعادة التقاط
          </button>
        </div>
      )}
    </div>
  );
}