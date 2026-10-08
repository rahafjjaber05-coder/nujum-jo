// src/utils/geminiService.js
import { GoogleGenAI } from "@google/genai";

// تهيئة مفتاح الـ API
const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY || "YOUR_API_KEY" });

export async function analyzeEducationalContent(inputData) {
  try {
    let responseText = "";

    if (inputData.type === 'text') {
      // إذا كان الإدخال نصاً
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `حلل هذا النص التعليمي واشرحه بأسلوب مبسط ومحفز مع اقتراح مجسم ثلاثي مناسب لشرحه: ${inputData.content}`,
      });
      responseText = response.text;

    } else if (inputData.type === 'image' || inputData.type === 'file') {
      // إذا كان الإدخال صورة أو ملف مرفق (نقوم بتحويله إلى Base64)
      const base64Data = await convertFileToBase64(inputData.content);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            inlineData: {
              data: base64Data.split(',')[1],
              mimeType: inputData.content.type || 'image/jpeg'
            }
          },
          { text: "قم بتحليل هذه الصفحة الدراسية، استخرج المفاهيم الأساسية منها، وجهز لنا ملخصاً تفاعلياً واقترح عنصر 3D لشرح الفكرة." }
        ],
      });
      responseText = response.text;
    }

    return responseText;
  } catch (error) {
    console.error("خطأ في تحليل المحتوى عبر الذكاء الاصطناعي:", error);
    return "عذراً يا رهف، حدث خطأ أثناء الاتصال بالمحرك الذكي. تأكدي من المفتاح وصحيح المحاولة!";
  }
}

// دالة مساعدة لتحويل الملفات إلى Base64
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}