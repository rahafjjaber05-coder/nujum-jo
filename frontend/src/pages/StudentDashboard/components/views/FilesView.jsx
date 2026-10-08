import React, { useState } from 'react';

const FilesView = ({ setSelectedFile, showToast }) => {
  const [dragOver, setDragOver] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      setCurrentFile(file);
      setSelectedFile(file);
      if (showToast) {
        showToast(`تم إرفاق الملف (${file.name}) بنجاح! يمكنك البدء بالتحليل.`);
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
      minHeight: '75vh',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      
      {/* عنوان الصفحة ووصفها */}
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#fde047', margin: '0 0 10px 0' }}>
          📁 إرفاق الملفات والمستندات الذكية
        </h2>
        <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0, maxWidth: '600px', lineHeight: '1.6' }}>
          قم بسحب وإفلات الكتب أو الملفات الدراسية هنا، أو تصفح جهازك لتحليلها واستخراج النماذج ثلاثية الأبعاد فوراً.
        </p>
      </div>

      {/* منطقة السحب والإفلات الاحترافية */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        style={{
          width: '100%',
          maxWidth: '650px',
          border: `2px dashed ${dragOver ? '#fde047' : 'rgba(245, 158, 11, 0.4)'}`,
          backgroundColor: dragOver ? 'rgba(245, 158, 11, 0.1)' : '#111827',
          borderRadius: '20px',
          padding: '45px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          transition: 'all 0.3s ease',
          boxShadow: 'inset 0 4px 15px rgba(0,0,0,0.4)',
          position: 'relative',
          cursor: 'pointer'
        }}
      >
        <div style={{ fontSize: '50px' }}>📄✨</div>
        
        <div>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>
            {currentFile ? `الملف المختار: ${currentFile.name}` : 'اسحب الملفات إلى هنا أو اضغط للاختيار'}
          </h4>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            {currentFile ? `الحجم: ${(currentFile.size / (1024*1024)).toFixed(2)} MB` : 'ندعم صيغ PDF، المستندات، والصور الدراسية'}
          </span>
        </div>

        {/* زر تصفح الملفات المخفي فوق المنطقة بالكامل لسهولة الضغط */}
        <input 
          type="file" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />

        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #fde047)',
          color: '#070b14',
          padding: '10px 24px',
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
          pointerEvents: 'none'
        }}>
          تصفح الملفات 🔍
        </div>
      </div>

    </div>
  );
};

export default FilesView;