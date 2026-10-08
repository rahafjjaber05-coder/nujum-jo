// دالة لتحويل النصوص إلى صوت عبر المتصفح
export function speakText(text, onEndCallback) {
  // التحقق من دعم المتصفح لخاصية النطق الصوتي
  if (!('speechSynthesis' in window)) {
    console.warn("المتصفح لا يدعم خاصية النطق الصوتي (Speech Synthesis).");
    if (onEndCallback) onEndCallback();
    return;
  }

  // إيقاف أي صوت قيد التشغيل حالياً لمنع تداخل الأصوات
  window.speechSynthesis.cancel();

  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // ضبط إعدادات الصوت للغة العربية
  utterance.lang = 'ar-SA'; // أو 'ar-EG'
  utterance.rate = 1.0; // سرعة الكلام (1.0 طبيعي)
  utterance.pitch = 1.0; // نبرة الصوت

  // عند انتهاء الكلام
  if (onEndCallback) {
    utterance.onend = () => {
      onEndCallback();
    };
  }

  // بدء تشغيل الصوت
  window.speechSynthesis.speak(utterance);
}

// دالة إيقاف الصوت فوراً
export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}