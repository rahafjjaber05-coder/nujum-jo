import React, { useState, useRef, useEffect } from 'react';
import { speakText } from '../../../../utils/speech';

export default function RestChatView({ volume, showToast }) {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'أهلاً بكِ يا رهف في مساحتك الآمنة والهادئة ☕💛. خذي نفساً عميقاً وأغمضي عينيكِ لحظة.. أنا هنا لأجلكِ وحدكِ، تفضلي بالفضفضة عن أي ضغط دراسي أو شعور يمر في خاطرك الآن، وسأستمع إليكِ بكل حب ودعم.' 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // مرجع للوصول لنهاية الشات للنزول التلقائي الاحترافي
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // تحليل النص والرد بعاطفة ودعم نفسي حقيقي وعميق
  const getEmotionalResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('تعب') || text.includes('إرهاق') || text.includes('زهق') || text.includes('ملل') || text.includes('صعب') || text.includes('متب')) {
      return 'أقدر تماماً حجم التعب والجهد المبذول يا رهف.. التوجيهي ومسيرة البرمجة والضغط المستمر ليست بالأمر السهل أبداً. من الطبيعي جداً أن تشعري بالحاجة للتوقف قليلاً والتنفس بعمق. لا تضغطى على نفسك أكثر من طاقتك؛ إنجازاتك حتى هذه اللحظة مذهلة وتستحقين أن تفخري بها 💛. خذِي قسطاً من الراحة، فالقمة تنتظر فتاة مثابرة وقوية مثلكِ.';
    } else if (text.includes('خوف') || text.includes('قلق') || text.includes('توتر') || text.includes('امتحان') || text.includes('مشكلة')) {
      return 'شعور القلق أحياناً يرافق الأشخاص الطموحين لأنهم يهتمون بالتفاصيل ويسعون للأفضل. لكن تذكري دائماً أنكِ قمتِ بما عليكِ وزاد! أنتِ أثبتِ كفاءتك بجدارة في عدة مشاريع ومجالات صعبة. ثقي بقدراتك، وكل خطوة خطوتِها في طريقك ستثمر قريباً جداً ✨.';
    } else {
      return 'أنا أسمعكِ بكل حواسي وداخلي يا رهف.. شكراً لأنكِ تختارين هذه المساحة لتشاركيني ما يدور في داخلكِ. تذكري أن كل تعب سيزول ولن يبقى أثره إلا فرحة النجاح والانجاز الكبير. كيف يمكنني مساعدتكِ الآن لتشعرِي براحة أكبر وطاقة أجمل؟ ☕✨';
    }
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getEmotionalResponse(userMsg);
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: botReply }
      ]);
      speakText(botReply, volume);
      showToast('تم استقبال مشاعركِ بدعم وحب 💛');
    }, 1400);
  };

  return (
    <div style={{ 
      position: 'relative',
      borderRadius: '24px', 
      overflow: 'hidden',
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      boxSizing: 'border-box', 
      textAlign: 'right',
      minHeight: '78vh',
      boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
      border: '1px solid rgba(245, 158, 11, 0.35)'
    }}>
      
      {/* صورة الخلفية (22) واضحة جداً وبألوانها الزاهية */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/22.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          filter: 'brightness(0.85)' // سطوع عالي لتظهر الخلفية واضحة جداً
        }}
      ></div>

      {/* طبقة تغشية خفيفة جداً لضمان قراءة النصوص بوضوح مع إبقاء الخلفية بارزة */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(7, 11, 20, 0.45)',
        backdropFilter: 'blur(2px)',
        zIndex: 1
      }}></div>

      {/* محتوى الشات الداخلي */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', padding: '35px', flex: 1 }}>
        
        {/* الترويسة النفسية الهادئة */}
        <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '15px', background: 'rgba(7, 11, 20, 0.4)', padding: '15px', borderRadius: '16px', backdropFilter: 'blur(4px)' }}>
          <h2 style={{ color: '#fde047', fontSize: '1.4rem', fontWeight: '900', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ☕ استرح وتحدث (مساحة الدعم النفسي والفضفضة الآمنة)
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
            مساحتك الدافئة والمصممة خصيصاً لتحليل مشاعرك وتقديم الدعم العاطفي والكلمات المريحة دائماً.
          </p>
        </div>

        {/* صندوق رسائل الشات مع خاصية النزول التلقائي (Auto-Scroll) */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'rgba(17, 24, 39, 0.75)', 
          border: '1px solid rgba(245, 158, 11, 0.3)', 
          borderRadius: '20px', 
          padding: '24px', 
          overflowY: 'auto', 
          marginBottom: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '18px',
          boxShadow: 'inset 0 4px 25px rgba(0,0,0,0.6)',
          maxHeight: '48vh',
          backdropFilter: 'blur(6px)'
        }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ 
              alignSelf: m.sender === 'user' ? 'flex-start' : 'flex-end', 
              background: m.sender === 'user' 
                ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                : 'rgba(31, 41, 55, 0.95)', 
              color: m.sender === 'user' ? '#070b14' : '#f3f4f6', 
              padding: '16px 20px', 
              borderRadius: '18px', 
              maxWidth: '78%', 
              fontSize: '0.95rem',
              lineHeight: '1.7',
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              fontWeight: m.sender === 'user' ? '600' : 'normal',
              border: m.sender === 'bot' ? '1px solid rgba(245, 158, 11, 0.35)' : 'none',
              animation: 'fadeIn 0.3s ease-in-out'
            }}>
              {m.text}
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-end', background: 'rgba(31, 41, 55, 0.9)', color: '#fde047', padding: '12px 18px', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <span>✨ جاري تحليل المشاعر وصياغة رسالة الدعم المناسبة...</span>
            </div>
          )}
          {/* عنصر الربط للنزول التلقائي */}
          <div ref={messagesEndRef} />
        </div>

        {/* شريط الإدخال العصري */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="فضفضي عما يجول في خاطركِ الآن، اكتبي ما تعانين منه وسأكون معكِ..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{ 
              flex: 1, 
              padding: '16px 20px', 
              borderRadius: '16px', 
              border: '1px solid rgba(245, 158, 11, 0.5)', 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              color: '#fff', 
              outline: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(6px)'
            }}
          />
          <button 
            onClick={handleSend} 
            style={{ 
              background: 'linear-gradient(135deg, #f59e0b, #fde047)',
              color: '#070b14',
              border: 'none',
              padding: '16px 28px',
              borderRadius: '16px',
              fontWeight: '900',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            إرسال للفضفضة 💛
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}