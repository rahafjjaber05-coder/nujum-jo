import React, { useState } from 'react';
import CameraCapture from './CameraCapture';

export default function UploadModal({ isOpen, onClose, onSuccess }) {
  const [selectedMode, setSelectedMode] = useState('file'); // 'file' | 'text' | 'camera'
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsLoading(true);

    // التحقق من المدخلات حسب الوضع المختار
    if (selectedMode === 'text' && !inputText.trim()) {
      alert('يرجى كتابة النص الدراسي أولاً');
      setIsLoading(false);
      return;
    }
    if (selectedMode === 'file' && !selectedFile) {
      alert('يرجى اختيار ملف PDF أو مستند أولاً');
      setIsLoading(false);
      return;
    }
    if (selectedMode === 'camera' && !cameraImage) {
      alert('يرجى التقاط صورة الصفحة بالكاميرا أولاً');
      setIsLoading(false);
      return;
    }

    // محاكاة الاتصال الذكي وتوليد نتيجة ديناميكية فريدة بناءً على خيار المستخدم
    setTimeout(() => {
      let dynamicResult = {
        title: "تحليل المحتوى التعليمي (AI Pro)",
        explanation: "",
        audioText: "",
        modelType: "custom_3d_model"
      };

      if (selectedMode === 'text') {
        dynamicResult.title = "تحليل النص: " + inputText.substring(0, 25) + "...";
        dynamicResult.explanation = `تم تحليل النص البرمجي أو العلمي المدخل بدقة، وتوليد نموذج ثلاثي الأبعاد يعكس المفاهيم المشروحة في النص مع اختبار قصير تفاعلي.`;
        dynamicResult.audioText = `أهلاً بك يا رهف. تم تحويل النص الذي كتبته إلى شرح تفاعلي ونموذج ثلاثي الأبعاد مميز.`;
      } else if (selectedMode === 'file') {
        dynamicResult.title = "تحليل الملف: " + (selectedFile ? selectedFile.name : 'مستند دراسي');
        dynamicResult.explanation = `تم قراءة المستند واستخراج المحتوى العلمي منه، وتحويله إلى بيئة عمل تفاعلية وثلاثية الأبعاد خاصة بالملف.`;
        dynamicResult.audioText = `تمت قراءة الملف المرفق بنجاح وجاهزية العرض ثلاثي الأبعاد للتفاعل.`;
      } else if (selectedMode === 'camera') {
        dynamicResult.title = "تحليل صفحة الكتاب الملتقطة بالكاميرا";
        dynamicResult.explanation = `تم التعرف الضوئي على النص وتفاصيل الصورة (OCR) وتحويل رسومات وعناصر الكتاب إلى مجسم 3D واقعي.`;
        dynamicResult.audioText = `تم تحليل الصورة الملتقطة من صفحة الكتاب وتحويلها لرحلة تعليمية كرتونية ثلاثية الأبعاد.`;
      }

      setIsLoading(false);
      onSuccess(dynamicResult);
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(5, 8, 15, 0.88)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
    }} dir="rtl">
      <div style={{
        backgroundColor: '#0b101d', border: '2px solid rgba(250, 204, 21, 0.5)',
        borderRadius: '28px', padding: '35px', width: '100%', maxWidth: '600px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.85)', textAlign: 'right', position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', left: '20px', background: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '50%',
            width: '38px', height: '38px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          ✕
        </button>

        <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', color: '#fef08a', fontWeight: '900' }}>
          🏛️ مركز الإدخال والتحويل الذكي لـ 3D
        </h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#94a3b8' }}>
          كل وسيلة إدخال هنا مستقلة بذاتها وتنتج نتيجة فريدة ومخصصة حسب محتواك:
        </p>

        {/* الأزرار الثلاثة للاختيار */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div 
            onClick={() => setSelectedMode('file')}
            style={{
              backgroundColor: selectedMode === 'file' ? 'rgba(250, 204, 21, 0.2)' : '#111827',
              border: selectedMode === 'file' ? '2px solid #fef08a' : '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px', padding: '16px 10px', cursor: 'pointer', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>📁</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>ملف PDF</div>
          </div>

          <div 
            onClick={() => setSelectedMode('text')}
            style={{
              backgroundColor: selectedMode === 'text' ? 'rgba(250, 204, 21, 0.2)' : '#111827',
              border: selectedMode === 'text' ? '2px solid #fef08a' : '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '16px', padding: '16px 10px', cursor: 'pointer', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>✍️</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>كتابة نص</div>
          </div>

          <div 
            onClick={() => setSelectedMode('camera')}
            style={{
              backgroundColor: selectedMode === 'camera' ? 'rgba(250, 204, 21, 0.2)' : '#111827',
              border: selectedMode === 'camera' ? '2px solid #fef08a' : '1px solid rgba(250, 204, 21, 0.3)',
              borderRadius: '16px', padding: '16px 10px', cursor: 'pointer', textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>📸</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>الكاميرا الحية</div>
          </div>
        </div>

        {/* عرض المحتوى حسب الوضع المختار */}
        {selectedMode === 'text' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#fef08a', marginBottom: '6px' }}>اكتبي النص الدراسي المطلوب شرحه:</label>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتبي شرح الدرس، الملاحظات، أو الأسئلة هنا..."
              style={{ width: '100%', height: '110px', backgroundColor: '#111827', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '12px', padding: '12px', color: '#fff', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {selectedMode === 'file' && (
          <div style={{ marginBottom: '20px', backgroundColor: '#111827', padding: '20px', borderRadius: '14px', border: '1px solid rgba(250,204,21,0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
            <input 
              type="file" 
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ color: '#fff', fontSize: '13px', marginBottom: '10px' }}
            />
            <div style={{ color: '#94a3b8', fontSize: '12px' }}>
              {selectedFile ? `الملف المحدد: ${selectedFile.name}` : 'اختر ملف PDF أو وثيقة من جهازك'}
            </div>
          </div>
        )}

        {selectedMode === 'camera' && (
          <div style={{ marginBottom: '20px' }}>
            <CameraCapture onCapture={(imgData) => setCameraImage(imgData)} />
          </div>
        )}

        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            width: '100%', background: 'linear-gradient(135deg, #facc15, #fef08a)',
            color: '#070b14', padding: '14px', borderRadius: '16px', fontWeight: '900',
            fontSize: '15px', cursor: 'pointer', border: 'none',
            boxShadow: '0 8px 20px rgba(250, 204, 21, 0.3)', opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? '⏳ جاري تحليل المدخلات وتوليد الـ 3D الديناميكي...' : '🚀 بدء التحليل والإنتاج الحقيقي'}
        </button>
      </div>
    </div>
  );
}