import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DViewer({ modelUrl, modelType, title }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. إعداد المشهد والكاميرا
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // 2. الإضاءة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfef08a, 1.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. مجموعة المجسمات التفاعلية
    const group = new THREE.Group();

    // فحص النص أو العنوان لمعرفة نوع الدرس وتغيير الأشكال والألوان بناءً عليه
    const textToCheck = (title || modelType || "").toLowerCase();
    const isDigestive = textToCheck.includes('هضمي') || textToCheck.includes('معدة') || textToCheck.includes('جسم') || textToCheck.includes('انسان');
    const isSpace = textToCheck.includes('فضاء') || textToCheck.includes('كوكب') || textToCheck.includes('قمر');

    let mainColor = 0xfacc15; // أصفر افتراضي
    let secondaryColor = 0x38bdf8;

    if (isDigestive) {
      mainColor = 0xef4444; // أحمر حيوي للجهاز الهضمي
      secondaryColor = 0xf97316; // برتقالي
    } else if (isSpace) {
      mainColor = 0x6366f1; // أزرق فضائي
      secondaryColor = 0xa855f7; // بنفسجي
    }

    // تصميم الشكل الرئيسي
    const coreGeometry = isDigestive 
      ? new THREE.ConeGeometry(1.2, 2.2, 32) 
      : (isSpace ? new THREE.SphereGeometry(1.3, 32, 32) : new THREE.TorusKnotGeometry(1, 0.3, 100, 16));
      
    const coreMaterial = new THREE.MeshStandardMaterial({ color: mainColor, roughness: 0.2, metalness: 0.5 });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // إضافات تدور حول الشكل الرئيسي
    const satellites = [];
    for (let i = 0; i < 3; i++) {
      const satGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const satMat = new THREE.MeshStandardMaterial({ color: secondaryColor, roughness: 0.3 });
      const sat = new THREE.Mesh(satGeo, satMat);
      
      const angle = (i / 3) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
      group.add(sat);
      satellites.push({ mesh: sat, angle, speed: 0.02 + i * 0.008 });
    }

    scene.add(group);

    // 4. حلقة الحركة السينمائية
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.x += 0.005;
      group.rotation.y += 0.008;

      satellites.forEach(item => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * 2.3;
        item.mesh.position.y = Math.sin(item.angle) * 2.3;
      });

      renderer.render(scene, camera);
    };
    animate();

    // 5. ضبط المقاسات عند تغيير النافذة
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
      coreGeometry.dispose();
      coreMaterial.dispose();
    };
  }, [title, modelType]);

  return (
    <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-yellow-200/20 shadow-2xl bg-[#070b14] flex flex-col">
      <div className="absolute top-3 left-4 right-4 z-10 flex justify-between items-center bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-yellow-200/20">
        <span className="text-yellow-300 font-bold text-sm">
          ✨ {title || "مشهد المحاكاة التفاعلي ثلاثي الأبعاد"}
        </span>
        <span className="text-xs text-gray-400 bg-yellow-500/10 px-2 py-1 rounded">
          {modelType || "Interactive 3D"}
        </span>
      </div>

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-yellow-200/90 text-xs border border-yellow-200/30 flex justify-between items-center">
        <span>🎮 محاكاة تفاعلية ذكية تتكيف مع محتوى الدرس</span>
        <span className="text-gray-300">تحرك واستكشف بحرية</span>
      </div>
    </div>
  );
}