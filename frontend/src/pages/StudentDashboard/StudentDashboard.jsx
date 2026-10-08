import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Html, useGLTF, Stars, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

// استيراد الملفات والواجهات الفرعية
import BooksView from './components/views/BooksView';
import FilesView from './components/views/FilesView';
import HomeworkView from './components/views/HomeworkView';
import MeetingsView from './components/views/MeetingsView';
import ProfileView from './components/views/ProfileView';
import RecordingsView from './components/views/RecordingsView';
import RestChatView from './components/views/RestChatView';

// عبارات التحفيز المتجددة
const motivationalQuotes = [
  { text: "تعب الدراسة مؤقت، لكن فرحة النجاح تدوم.", icon: "⏳" },
  { text: "اجتهد اليوم لتحصد نجاحك غداً.", icon: "🌱" },
  { text: "كل مجهود تبذله اليوم سيصنع مستقبلك.", icon: "🚀" },
  { text: "ليس الحلم ما تراه في نومك، الحلم هو ما يمنعك من النوم.", icon: "🌙" },
  { text: "كل صفحة تقرؤها اليوم تقربك خطوة أخرى من حلمك.", icon: "📖" },
  { text: "لا تجعل صعوبة البداية تمنعك من الوصول.", icon: "⛰️" },
  { text: "النجاح لا يُهدى، بل يُنتزع بالجد والمذاكرة المستمرة.", icon: "🏆" },
  { text: "وإن قل في الطريق صبرك.. لا تقف ولا تنثني، فرب الحياة معك.", icon: "✨" },
  { text: "الخطوات الصغيرة الثابتة تصنع إنجازاً عظيماً في النهاية.", icon: "👣" },
  { text: "العلم طريقك الوحيد لتحقيق أحلامك الكبيرة.", icon: "💡" },
  { text: "لا تخف من صعوبة الطريق، فالذي خلق الطريق خلق فيك القوة لاجتيازه.", icon: "🛡" },
  { text: "أنت تذاكر اليوم لتصنع لنفسك غداً مشرقاً ومليئاً بالفخر.", icon: "🌟" },
  { text: "العزيمة والإصرار هما سر التفوق الحقيقي.", icon: "🔥" },
  { text: "كل دقيقة تقضيها في التركيز اليوم هي استثمار حقيقي في مستقبلك.", icon: "⏱️" },
  { text: "اجعل من كل يوم دراسي فرصة لتكون أفضل من الأمس.", icon: "📈" },
  { text: "لا تتردد ولا تأجل عمل اليوم إلى الغد، فوقتك ثروتك.", icon: "💎" },
  { text: "الثقة بالنفس والإيمان بالقدرات يصنعان المعجزات.", icon: "🧠" },
  { text: "الفشل ليس نهاية المطاف، بل هو بداية جديدة للتعلم بشكل أفضل.", icon: "🔄" },
  { text: "اصبر قليلاً، فما هي إلا أيام صعبة ستصنع قصة نجاحك.", icon: "🎯" },
  { text: "القمة تنتظر من يجد ويجهد، فكن أنت ذلك البطل.", icon: "👑" }
];

const MotivationalCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
        setFade(true);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
      setFade(true);
    }, 300);
  };

  const currentQuote = motivationalQuotes[currentIndex];

  return (
    <div 
      onClick={handleCardClick}
      title="اضغطي هنا للتغيير الفوري للعبارة!"
      style={{
        backgroundColor: '#0f172a',
        borderRadius: '18px',
        padding: '18px',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        textAlign: 'center',
        transition: 'all 0.4s ease-in-out',
        opacity: fade ? 1 : 0,
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        marginBottom: '20px',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ fontSize: '26px', marginBottom: '6px' }}>{currentQuote.icon}</div>
      <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#fef08a', fontWeight: 'bold' }}>إضاءة تحفيزية متجددة ✨</h5>
      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6', minHeight: '44px' }}>
        {currentQuote.text}
      </p>
      <div style={{ width: '100%', backgroundColor: '#e7d727', height: '5px', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ width: '100%', background: 'linear-gradient(to left, #eab308, #fef08a)', height: '100%' }}></div>
      </div>
      <div style={{ fontSize: '10px', color: '#facc15', marginTop: '6px', opacity: 0.85 }}>يتغير تلقائياً أو اضغطي للتغيير</div>
    </div>
  );
};

/* =========================================================
   Nujum JO AI Pro — Professional 3D Scene Engine
   ========================================================= */

const normalizeVector = (value, fallback) => {
  if (!Array.isArray(value) || value.length !== 3) return fallback;
  return value.map((n) => Number(n) || 0);
};

const normalizeScale = (value) => {
  if (!Array.isArray(value) || value.length !== 3) return [1, 1, 1];
  return value.map((n) => Math.max(0.01, Number(n) || 1));
};

function GLBSceneObject({ object }) {
  const { scene } = useGLTF(object.model_url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const position = normalizeVector(object.position, [0, 0, 0]);
  const rotation = normalizeVector(object.rotation, [0, 0, 0]);
  const scale = normalizeScale(object.scale);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={clonedScene} />
      <Html position={[0, 1.5, 0]} center distanceFactor={8}>
        <div
          style={{
            background: 'rgba(2, 6, 23, 0.88)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: 8,
            border: '1px solid rgba(250,204,21,.35)',
            fontSize: 12,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 8px 20px rgba(0,0,0,.35)',
          }}
        >
          {object.name || 'مجسم تعليمي'}
        </div>
      </Html>
    </group>
  );
}

function PrimitiveSceneObject({ object }) {
  const meshRef = useRef();
  const position = normalizeVector(object.position, [0, 0, 0]);
  const rotation = normalizeVector(object.rotation, [0, 0, 0]);
  const scale = normalizeScale(object.scale);
  const type = String(object.type || 'box').toLowerCase();
  const color = object.color || '#facc15';

  // دوران تلقائي بطيء
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  let geometry = <boxGeometry args={[1, 1, 1]} />;

  if (type.includes('sphere') || type.includes('planet') || type.includes('ball')) {
    geometry = <sphereGeometry args={[0.7, 64, 64]} />;
  } else if (type.includes('cylinder')) {
    geometry = <cylinderGeometry args={[0.5, 0.5, 1.4, 64]} />;
  } else if (type.includes('cone')) {
    geometry = <coneGeometry args={[0.65, 1.3, 64]} />;
  } else if (type.includes('torus') || type.includes('ring')) {
    geometry = <torusGeometry args={[0.55, 0.18, 32, 64]} />;
  }

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh ref={meshRef} castShadow receiveShadow>
          {geometry}
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.3}
            emissive={color}
            emissiveIntensity={0.35}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* هالة توهج */}
        <pointLight position={[0, 0, 0]} color={color} intensity={1.5} distance={3} />

        {/* حلقة خارجية (اختياري لكل مجسم) */}
        {type.includes('sphere') && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
          </mesh>
        )}

        <Html position={[0, 1.3, 0]} center distanceFactor={10}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.95), rgba(234, 179, 8, 0.95))',
              color: '#070b14',
              padding: '6px 14px',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 8px 25px rgba(250, 204, 21, 0.6)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            {object.name || 'عنصر تعليمي'}
          </div>
        </Html>
      </group>
    </Float>
  );
}
function SceneObject3D({ object }) {
  if (object?.model_url) {
    return <GLBSceneObject object={object} />;
  }

  return <PrimitiveSceneObject object={object} />;
}
/* =========================================================
   مكون تسجيل الفيديو من Canvas
   ========================================================= */
function VideoRecorder({ canvasRef, isRecording, onStop }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (isRecording) {
      const canvas = canvasRef.current;
      const stream = canvas.captureStream(30);
      
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8000000,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `nujum-3d-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (onStop) onStop();
      };

      mediaRecorder.start();
    } else if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording, canvasRef, onStop]);

  return null;
}
function EducationalScene({ sceneData }) {
  const objects = Array.isArray(sceneData?.objects) ? sceneData.objects : [];
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const cameraPosition = normalizeVector(
    sceneData?.camera?.position,
    [0, 3, 9]
  );

  const cameraTarget = normalizeVector(
    sceneData?.camera?.target,
    [0, 1, 0]
  );

  // مؤقت التسجيل
  useEffect(() => {
    let interval;
    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const stream = canvas.captureStream(30);
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 8000000,
      });

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nujum-3d-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      window.__nujumRecorder = mediaRecorder;
      setIsRecording(true);
    } else {
      if (window.__nujumRecorder) {
        window.__nujumRecorder.stop();
        window.__nujumRecorder = null;
      }
      setIsRecording(false);
    }
  };

  const handleCanvasCreated = ({ gl }) => {
    canvasRef.current = gl.domElement;
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* شريط التحكم بالتسجيل */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: 20,
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        {isRecording && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.95)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.6)'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              animation: 'recBlink 1s infinite'
            }}></span>
            {formatTime(recordingTime)}
          </div>
        )}
        
        <button
          onClick={handleToggleRecording}
          style={{
            backgroundColor: isRecording ? 'rgba(239, 68, 68, 0.95)' : 'rgba(250, 204, 21, 0.95)',
            color: isRecording ? '#fff' : '#070b14',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {isRecording ? '⏹ إيقاف وتحميل' : '🎥 تسجيل فيديو 3D'}
        </button>
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{
          position: cameraPosition,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        onCreated={handleCanvasCreated}
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 30%, #1e3a8a 0%, #0f172a 45%, #020617 100%)',
        }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 20, 70]} />

        {/* نجوم في الخلفية */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* إضاءة سينمائية متعددة */}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[8, 12, 8]}
          intensity={1.8}
          color="#ffffff"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-8, 6, -6]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[8, -4, 6]} intensity={1.2} color="#facc15" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#fef08a"
          castShadow
        />
        <Environment preset="night" />

        <Grid
          args={[40, 40]}
          cellSize={1}
          cellThickness={0.35}
          sectionSize={5}
          sectionThickness={0.8}
          fadeDistance={35}
          fadeStrength={1}
          infiniteGrid
        />

        {objects.map((object, index) => (
          <SceneObject3D
            key={object.id || `${object.name || 'object'}-${index}`}
            object={object}
          />
        ))}

        <OrbitControls
          makeDefault
          target={cameraTarget}
          enableDamping
          dampingFactor={0.08}
          minDistance={3}
          maxDistance={50}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('home');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // حالات المعالجة والذكاء الاصطناعي
  const [selectedMode, setSelectedMode] = useState('file'); // 'file' | 'text' | 'camera'
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);

  // الاتصال الفعلي بالـ FastAPI مع توحيد صيغة الإدخال
  const handleProcessContent = async () => {
    if (selectedMode === 'text' && !inputText.trim()) {
      alert('اكتبي النص الدراسي أولاً.');
      return;
    }

    if (selectedMode === 'file' && !selectedFile) {
      alert('اختاري ملفاً أولاً.');
      return;
    }

    if (selectedMode === 'camera' && !selectedFile) {
      alert('التقطي صورة للصفحة أولاً.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('mode', selectedMode);

      if (selectedMode === 'text') {
        formData.append('text', inputText.trim());
      }

      if ((selectedMode === 'file' || selectedMode === 'camera') && selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch(
        'http://localhost:8000/api/analyze-content',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        let message = 'فشل الاتصال بالسيرفر أو معالجة المحتوى.';
        try {
          const errorData = await response.json();
          message = errorData.detail || errorData.error || message;
        } catch (_) {}
        throw new Error(message);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'فشل تحليل المحتوى.');
      }

      setAiResult(data);
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error('Nujum AI error:', error);
      alert(
        `تعذر تحليل المحتوى.\n\n${error.message}\n\nتأكدي من تشغيل FastAPI على http://localhost:8000`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const playAudioExplanation = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("متصفحك لا يدعم خاصية الشرح الصوتي المباشر.");
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileView />;
      case 'books':
        return <BooksView />;
      case 'homework':
        return <HomeworkView />;
      case 'meetings':
        return <MeetingsView />;
      case 'rest':
        return <RestChatView />;
      case 'recordings':
        return <RecordingsView />;
      case 'files':
        return <FilesView />;
      case 'home':
      default:
        return (
          <>
            {aiResult ? (
              <div style={{
                backgroundColor: '#0b101d',
                border: '2px solid rgba(250, 204, 21, 0.5)',
                borderRadius: '28px',
                padding: '40px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease-in-out'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏛</div>
                <h3 style={{ color: '#fef08a', fontSize: '26px', marginBottom: '14px', fontWeight: '900' }}>
                  {aiResult.title}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto 30px auto' }}>
                  {aiResult.explanation}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => playAudioExplanation(aiResult.narration || aiResult.explanation)}
                    className="interactive-btn"
                    style={{
                      backgroundColor: 'rgba(250, 204, 21, 0.18)', color: '#fef08a',
                      border: '1px solid rgba(250, 204, 21, 0.5)', padding: '14px 28px',
                      borderRadius: '30px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <span>🔊</span> استمع للشرح الصوتي
                  </button>

                  <button 
                    onClick={() => setIs3DViewerOpen(true)}
                    className="interactive-btn"
                    style={{
                      background: 'linear-gradient(135deg, #facc15, #fef08a)', color: '#070b14',
                      border: 'none', padding: '14px 30px',
                      borderRadius: '30px', fontSize: '15px', fontWeight: '900', cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(250, 204, 21, 0.4)',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    <span>✨</span> افتح العرض ثلاثي الأبعاد (3D View)
                  </button>

                  <button 
                    onClick={() => setAiResult(null)}
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.4)', padding: '14px 22px',
                      borderRadius: '30px', fontSize: '14px', cursor: 'pointer'
                    }}
                  >
                    🔄 تحليل محتوى جديد
                  </button>
                </div>

                {/* نافذة عرض نموذج الـ 3D التفاعلي عند تفعيلها */}
                {is3DViewerOpen && (
                  <div style={{
                    marginTop: '30px',
                    width: '100%',
                    height: '450px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(250, 204, 21, 0.4)',
                    position: 'relative'
                  }}>
                    <button
                      onClick={() => setIs3DViewerOpen(false)}
                      style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        zIndex: 10,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '12px'
                      }}
                    >
                      إغلاق العرض ✕
                    </button>
                    <EducationalScene sceneData={aiResult.scene_data || {}} />
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                position: 'relative',
                borderRadius: '28px',
                backgroundImage: `linear-gradient(135deg, rgba(7, 11, 20, 0.95), rgba(40, 25, 5, 0.92)), url(/hero-bg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '60px 50px',
                border: '2px solid rgba(250, 204, 21, 0.45)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box',
                minHeight: '460px'
              }}>
                <div style={{ maxWidth: '700px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(250, 204, 21, 0.15)',
                    color: '#fef08a',
                    padding: '8px 18px',
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    border: '1px solid rgba(250, 204, 21, 0.3)'
                  }}>
                    <span className="animated-star">⭐</span> النمذجة الذكية بالذكاء الاصطناعي
                  </div>
                  <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#fff', margin: '0 0 16px 0', lineHeight: '1.35' }}>
                    من كتابك ... إلى <span style={{ color: '#fef08a' }}>عالم ثلاثي الأبعاد</span>
                  </h2>
                  <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.7', margin: '0 0 28px 0' }}>
                    حول صفحات كتبك الدراسية وملاحظاتك إلى بيئات ومجسمات تفاعلية ثلاثية الأبعاد بضغطة زر واحدة.
                  </p>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.5)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(250,204,21,0.25)' }}>
                      <span style={{ fontSize: '22px' }}>📸</span>
                      <div style={{ fontSize: '13px' }}>
                        <div style={{ fontWeight: 'bold', color: '#fef08a' }}>1. تصوير / رفع</div>
                        <div style={{ color: '#94a3b8' }}>ملفات أو كاميرا</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.5)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(250,204,21,0.25)' }}>
                      <span style={{ fontSize: '22px' }}>🧠</span>
                      <div style={{ fontSize: '13px' }}>
                        <div style={{ fontWeight: 'bold', color: '#fef08a' }}>2. تحليل ذكي</div>
                        <div style={{ color: '#94a3b8' }}>بواسطة الـ AI</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.5)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(250,204,21,0.25)' }}>
                      <span style={{ fontSize: '22px' }}>🏛️</span>
                      <div style={{ fontSize: '13px' }}>
                        <div style={{ fontWeight: 'bold', color: '#fef08a' }}>3. استعراض 3D</div>
                        <div style={{ color: '#94a3b8' }}>نماذج تفاعلية مذهلة</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div 
                    onClick={() => { setSelectedMode('file'); setIsUploadModalOpen(true); }}
                    className="interactive-btn" 
                    style={{
                      background: 'linear-gradient(135deg, #facc15, #fef08a)',
                      color: '#070b14',
                      padding: '24px 45px',
                      borderRadius: '40px',
                      fontWeight: '900',
                      fontSize: '20px',
                      boxShadow: '0 10px 30px rgba(250, 204, 21, 0.4)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    ابدأ الآن 🚀
                  </div>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#070b14',
      color: '#f1f5f9', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: 'Cairo, sans-serif',
      overflowX: 'hidden'
    }} dir="rtl">

      <style>{`
      @keyframes recBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
  @keyframes recBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
        @keyframes starGlow {
          0% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 4px #facc15); }
          50% { transform: scale(1.25) rotate(10deg); filter: drop-shadow(0 0 14px #eab308); }
          100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 4px #facc15); }
        }
        .animated-star { animation: starGlow 2.5s infinite ease-in-out; }
        .interactive-btn { transition: all 0.3s ease-in-out; }
        .interactive-btn:hover {
          transform: scale(1.02);
          background-color: rgba(250, 204, 21, 0.18) !important;
          box-shadow: 0 6px 20px rgba(250, 204, 21, 0.25);
          border-color: #facc15 !important;
        }
        aside::-webkit-scrollbar { width: 5px; }
        aside::-webkit-scrollbar-thumb { background: rgba(250, 204, 21, 0.3); border-radius: 4px; }
      `}</style>

      {/* الشريط العلوي */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0b101d',
        padding: '16px 32px',
        borderBottom: '1px solid rgba(250, 204, 21, 0.25)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            className="interactive-btn"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '9px 20px',
              borderRadius: '30px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>تسجيل الخروج</span> 🚪
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>Najum JO</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>طالب متميز</div>
            </div>
            <div style={{
              width: '44px', height: '44px', backgroundColor: '#3b82f6', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
            }}>
              👤
            </div>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: '420px', margin: '0 32px' }}>
          <input 
            type="text" 
            placeholder="ابحث في محتوى المنصة والدورات..." 
            style={{
              width: '100%',
              backgroundColor: '#111827',
              border: '1px solid rgba(250, 204, 21, 0.25)',
              borderRadius: '16px',
              padding: '12px 20px',
              color: '#fff',
              fontSize: '13px',
              outline: 'none',
              textAlign: 'right'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
              <span className="animated-star" style={{ fontSize: '20px' }}>⭐</span>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#fef08a' }}>
                Najum JO
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: '#facc15' }}> منصة نجم للتعليم 🇯🇴</span>
          </div>
          <img 
            src="/star-pixel-removebg-preview.png" 
            alt="Logo" 
            style={{ width: '50px', height: '50px', borderRadius: '14px', objectFit: 'cover', border: '1px solid rgba(250, 204, 21, 0.4)' }} 
            onError={(e)=>{e.target.style.display='none'}}
          />
        </div>
      </header>

      {/* المحتوى والقائمة الجانبية */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <main style={{ flex: 1, padding: '36px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '28px', height: 'calc(100vh - 77px)', boxSizing: 'border-box' }}>
          {renderMainContent()}
        </main>

        <aside style={{
          width: '340px',
          height: 'calc(100vh - 77px)',
          backgroundColor: '#080d18',
          borderRight: '1px solid rgba(250, 204, 21, 0.25)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '77px',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          <MotivationalCard />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { id: 'home', label: '🏠 الرئيسية', view: 'home' },
              { id: 'profile', label: '👤 الملف الشخصي والبيانات', view: 'profile' },
              { id: 'books', label: '📖 الكتب الدراسية والمواد', view: 'books' },
              { id: 'files', label: '📁 ملفاتي ومستنداتي', view: 'files' },
              { id: 'homework', label: '📄 الواجبات والمهمات', view: 'homework' },
              { id: 'meetings', label: '🏛 قاعة الاجتماعات', view: 'meetings' },
              { id: 'rest', label: '💬 استرح وتحدث', view: 'rest' },
              { id: 'recordings', label: '🎙 التسجيلات والشروحات', view: 'recordings' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveView(item.view)}
                className="interactive-btn"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', 
                  backgroundColor: activeView === item.view ? 'rgba(250, 204, 21, 0.18)' : 'transparent',
                  border: activeView === item.view ? '1px solid rgba(250, 204, 21, 0.5)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px', 
                  color: activeView === item.view ? '#fef08a' : '#e2e8f0',
                  fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'right'
                }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>{item.label}</span>
                <span style={{ fontSize: '13px', opacity: 0.7 }}>&larr;</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* نافذة رفع وإدخال المحتوى */}
      {isUploadModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(5, 8, 15, 0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#0b101d',
            border: '2px solid rgba(250, 204, 21, 0.5)',
            borderRadius: '28px',
            padding: '40px',
            width: '100%',
            maxWidth: '620px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.85)',
            textAlign: 'right',
            position: 'relative',
            boxSizing: 'border-box'
          }}>
            <button 
              onClick={() => setIsUploadModalOpen(false)}
              className="interactive-btn"
              style={{
                position: 'absolute', top: '24px', left: '24px',
                background: 'rgba(239, 68, 68, 0.15)', color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '50%',
                width: '40px', height: '40px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '28px' }}>🏛</span>
              <h3 style={{ margin: 0, fontSize: '24px', color: '#fef08a', fontWeight: '900' }}>
                بوابة التحويل الذكي للنماذج ثلاثية الأبعاد
              </h3>
            </div>
            <p style={{ margin: '0 0 28px 0', fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>
              اختاري طريقة الإدخال المفضلة لديك لتحليل محتواك الدراسي وتوليد بيئة تفاعلية مذهلة بالذكاء الاصطناعي:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
              <div 
                onClick={() => setSelectedMode('file')}
                className="interactive-btn"
                style={{
                  backgroundColor: selectedMode === 'file' ? 'rgba(250, 204, 21, 0.2)' : '#111827', 
                  border: selectedMode === 'file' ? '2px solid #fef08a' : '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '18px', padding: '20px 12px', cursor: 'pointer', textAlign: 'center',
                  boxShadow: selectedMode === 'file' ? '0 8px 20px rgba(250, 204, 21, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '8px' }}>📁</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>رفع ملف</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>PDF أو وثائق</div>
              </div>

              <div 
                onClick={() => setSelectedMode('text')}
                className="interactive-btn"
                style={{
                  backgroundColor: selectedMode === 'text' ? 'rgba(250, 204, 21, 0.2)' : '#111827', 
                  border: selectedMode === 'text' ? '2px solid #fef08a' : '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '18px', padding: '20px 12px', cursor: 'pointer', textAlign: 'center',
                  boxShadow: selectedMode === 'text' ? '0 8px 20px rgba(250, 204, 21, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '8px' }}>✍️</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>كتابة نص</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>ملاحظات أو دروس</div>
              </div>

              <div 
                onClick={() => setSelectedMode('camera')}
                className="interactive-btn"
                style={{
                  backgroundColor: selectedMode === 'camera' ? 'rgba(250, 204, 21, 0.2)' : '#111827', 
                  border: selectedMode === 'camera' ? '2px solid #fef08a' : '1px solid rgba(250, 204, 21, 0.3)',
                  borderRadius: '18px', padding: '20px 12px', cursor: 'pointer', textAlign: 'center',
                  boxShadow: selectedMode === 'camera' ? '0 8px 20px rgba(250, 204, 21, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '8px' }}>📸</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>التصوير</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>مسح صفحات الكتاب</div>
              </div>
            </div>

            {selectedMode === 'text' ? (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>
                  أدخلي النص أو ملاحظات الدرس:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="اكتبي أو الصقي الشرح هنا لتحليله وتوليد مجسمات 3D..."
                  rows={4}
                  style={{
                    width: '100%',
                    backgroundColor: '#111827',
                    border: '1px solid rgba(250, 204, 21, 0.3)',
                    borderRadius: '14px',
                    padding: '14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            ) : (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px', fontWeight: 'bold' }}>
                  {selectedMode === 'file' ? 'اختاري ملف PDF أو مستند:' : 'التقطي أو اختاري صورة الصفحة:'}
                </label>
                <input
                  type="file"
                  accept={selectedMode === 'file' ? '.pdf,.doc,.docx,.txt' : 'image/*'}
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                  style={{
                    width: '100%',
                    backgroundColor: '#111827',
                    border: '1px dashed rgba(250, 204, 21, 0.4)',
                    borderRadius: '14px',
                    padding: '16px',
                    color: '#fff',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                />
                {selectedFile && (
                  <div style={{ fontSize: '12px', color: '#fef08a', marginTop: '6px' }}>
                    الملف المحدد: {selectedFile.name}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleProcessContent}
              disabled={isLoading}
              className="interactive-btn"
              style={{
                width: '100%',
                background: isLoading ? '#64748b' : 'linear-gradient(135deg, #facc15, #fef08a)',
                color: '#070b14',
                border: 'none',
                padding: '16px',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 25px rgba(250, 204, 21, 0.3)'
              }}
            >
              {isLoading ? 'جاري التحليل وتوليد المشهد 3D... ⏳' : 'بدء التحليل التفاعلي 🚀'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;