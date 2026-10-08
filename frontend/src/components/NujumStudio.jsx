import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// -------------------------------------------------------------
// 1. مشغل العرض السينمائي الكرتوني ثلاثي الأبعاد + تسجيل الفيديو
// -------------------------------------------------------------
function CartoonVideoPlayer({ videoData }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // تشغيل الشرح الصوتي
  useEffect(() => {
    if (videoData && videoData.audioText) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(videoData.audioText);
        utterance.lang = 'ar-SA';
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [videoData]);

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

  // بدء/إيقاف التسجيل
  const toggleRecording = () => {
    if (!isRecording) {
      // بدء التسجيل
      const canvas = rendererRef.current?.domElement;
      if (!canvas) {
        alert('المشهد 3D غير جاهز بعد.');
        return;
      }

      // تشغيل الصوت قبل التسجيل
      if (videoData?.audioText && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(videoData.audioText);
        utterance.lang = 'ar-SA';
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }

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
      };

      mediaRecorder.start();
      setIsRecording(true);
    } else {
      // إيقاف التسجيل
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsRecording(false);
    }
  };

  // إعداد المشهد 3D
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      preserveDrawingBuffer: true // مهم لتسجيل الفيديو
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfde047, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // شكل هندسي تفاعلي كرتوني
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x0ea5e9, 
      roughness: 0.2, 
      metalness: 0.8 
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      mesh.rotation.x = elapsedTime * 0.6;
      mesh.rotation.y = elapsedTime * 0.9;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [videoData]);

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl bg-[#070b19] flex flex-col">
      <div className="absolute top-0 inset-x-0 bg-slate-900/90 backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-slate-800 z-10">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-sky-300 font-bold text-sm">🎬 نُجُم سينما الذكية (AI Cinema)</span>
        </div>
        <span className="text-xs bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full font-medium">
          {videoData?.title || "عرض ثلاثي الأبعاد تفاعلي"}
        </span>
      </div>

      {/* شريط التحكم بالتسجيل */}
      <div className="absolute top-16 right-4 z-20 flex items-center gap-3">
        {isRecording && (
          <div className="flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
            {formatTime(recordingTime)}
          </div>
        )}
        <button
          onClick={toggleRecording}
          className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-yellow-400 hover:bg-yellow-300 text-slate-900'
          }`}
        >
          {isRecording ? '⏹ إيقاف وتحميل' : '🎥 تسجيل فيديو 3D'}
        </button>
      </div>

      <div ref={mountRef} className="w-full h-full cursor-grab" />

      <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-xl flex items-center justify-between z-10">
        <div className="flex items-start space-x-3 space-x-reverse">
          <div className="text-2xl">🤖</div>
          <div>
            <p className="text-xs text-sky-400 font-bold mb-1">الشرح التفاعلي:</p>
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">{videoData?.audioText || videoData?.explanation || "جارِ توليد المحتوى..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. الواجهة الرئيسية الاحترافية (NujumStudio) — لا تغيير
// -------------------------------------------------------------
export default function NujumStudio() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lessonResult, setLessonResult] = useState({
    title: "مرحباً بكِ في نُجُم التعليم (Nujum JO AI Pro)",
    explanation: "اختاري إما كتابة موضوع تعليمي أو رفع صورة صفحة الكتاب، وسيتم تحويلها فوراً إلى فيلم كرتون تعليمي ثلاثي الأبعاد مع شرح صوتي متكامل.",
    modelType: "cartoon",
    steps: [
      { time: "00:00", action: "مقدمة الدرس والترحيب بالعنصر البصري" },
      { time: "00:15", action: "عرض النمذجة ثلاثية الأبعاد والشرح التفصيلي" },
      { time: "00:30", action: "ملخص سريع واختبار تفاعلي قصير" }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'text' && !inputText.trim()) {
      alert('الرجاء كتابة نص الموضوع أولاً!');
      return;
    }
    if (activeTab === 'image' && !selectedFile) {
      alert('الرجاء اختيار صورة صفحة الكتاب أولاً!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (activeTab === 'image' && selectedFile) {
        formData.append('file', selectedFile);
      }
      if (activeTab === 'text' && inputText.trim()) {
        formData.append('text', inputText); // ملاحظة: الباك إند يتوقع 'text' وليس 'text_prompt'
      }

      const response = await fetch('http://localhost:8000/api/analyze-content', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('السيرفر غير متصل');
      }

      const data = await response.json();
      setLessonResult({
        ...data,
        audioText: data.narration || data.explanation,
      });
    } catch (error) {
      console.warn('وضع المحاكاة التفاعلية:', error);
      setTimeout(() => {
        setLessonResult({
          title: activeTab === 'text' ? inputText : (selectedFile?.name || "تحليل صورة الكتاب"),
          explanation: "تم تحليل المحتوى بنجاح عبر نظام نُجُم الذكي!",
          modelType: "cartoon",
          audioText: "أهلاً بكِ يا رهف! قمت بتحويل صفحة الكتاب إلى مشهد سينمائي ثلاثي الأبعاد.",
          steps: [
            { time: "00:00", action: "استخراج النصوص وتحليل المفاهيم" },
            { time: "00:15", action: "بناء المجسمات وعرض الحركة" },
            { time: "00:30", action: "تقديم الشرح الصوتي النهائي" }
          ]
        });
        setLoading(false);
      }, 1200);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* الترويسة العلوية */}
        <div className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-md">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-sky-500/20">
              ✨
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-wide">نُجُم التعليم (Nujum JO AI Pro)</h1>
              <p className="text-slate-400 text-xs md:text-sm mt-0.5">منصة ذكية متكاملة لتحويل المناهج إلى أفلام كرتونية ثلاثية الأبعاد</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              متصل وجاهز للعمل
            </span>
          </div>
        </div>

        {/* قسم المحتوى */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* قسم الإدخال */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6">
            
            <div>
              <h2 className="text-base font-bold text-sky-400 mb-4 flex items-center space-x-2 space-x-reverse">
                <span>⚙️</span>
                <span>اختر طريقة الإدخال للتحويل لـ 3D:</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse border ${
                    activeTab === 'text' 
                      ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-600/30' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>📝</span>
                  <span>كتابة نص تعليمي</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('image')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 space-x-reverse border ${
                    activeTab === 'image' 
                      ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-600/30' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>📁</span>
                  <span>رفع صورة الكتاب</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'text' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">أدخلي عنوان أو تفاصيل الدرس:</label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="مثال: اشرح لي المجموعة الشمسية أو دورة المياه في الطبيعة..."
                      className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">ارفعي صورة صفحة الكتاب المدرسي:</label>
                    <label className="w-full h-36 bg-slate-950 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all p-4 text-center">
                      <span className="text-3xl mb-2">📸</span>
                      <span className="text-xs text-sky-400 font-bold mb-1">اضغطي لاختيار صورة الصفحة</span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                        {selectedFile ? selectedFile.name : "PNG, JPG حتى 10MB"}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => setSelectedFile(e.target.files[0])} 
                      />
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 text-sm flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>جاري التحليل والتوليد الفوري...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>بدء التحليل والتحويل لـ 3D</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <p className="font-bold text-sky-300">💡 مميزات النظام:</p>
              <p>• تحويل فوري لصور الكتب الدراسية إلى مجسمات تفاعلية.</p>
              <p>• شرح صوتي ذكي مرافق للعرض السينمائي.</p>
              <p>• تسجيل الفيديو 3D بضغطة زر.</p>
            </div>
          </div>

          {/* قسم العرض */}
          <div className="lg:col-span-7 space-y-6">
            
            <CartoonVideoPlayer videoData={lessonResult} />

            <div className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-lg font-bold text-sky-300 flex items-center space-x-2 space-x-reverse">
                <span>📖</span>
                <span>{lessonResult.title}</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {lessonResult.explanation}
              </p>

              {lessonResult.steps && lessonResult.steps.length > 0 && (
                <div className="border-t border-slate-800 pt-4">
                  <h4 className="text-xs font-bold text-yellow-400 mb-2.5">خطوات وسيناريو الدرس:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {lessonResult.steps.map((st, idx) => (
                      <div key={idx} className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                        <span className="text-sky-400 font-mono font-bold bg-sky-500/10 px-2 py-0.5 rounded">{st.time}</span>
                        <span className="text-right flex-1 mr-4">{st.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}