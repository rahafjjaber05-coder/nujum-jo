import React, { useState } from 'react';

// قائمة شاملة ومفصلة لجميع فروع وكتب التوجيهي الرسمية في الأردن مع مواضيعها الأساسية
const jordanTawjihiCurriculum = [
  {
    id: 'scientific',
    title: 'الثانوية العامة - الفرع العلمي',
    icon: '🔬',
    books: [
      {
        name: 'كتاب الرياضيات - الفصل الأول والثاني',
        pages: '240 صفحة',
        size: '15 MB',
        topics: ['التفاضل وتطبيقاته', 'التكامل المحدد وغير المحدد', 'المتجهات في الفضاء', 'الأعداد المركبة']
      },
      {
        name: 'كتاب الفيزياء - المنهج الأردني الجديد',
        pages: '190 صفحة',
        size: '12 MB',
        topics: ['الزخم الخطوي والتصادمات', 'الحركة الدورانية', 'الكهرباء التيارية', 'الكهرومغناطيسية']
      },
      {
        name: 'كتاب الكيمياء - وزارة التربية والتعليم',
        pages: '210 صفحة',
        size: '14 MB',
        topics: ['سرعة التفاعلات الكيميائية', 'الحموض والقواعد', 'الكيمياء الكهربائية', 'الكيمياء العضوية']
      },
      {
        name: 'كتاب الأحياء - الفرع العلمي',
        pages: '220 صفحة',
        size: '16 MB',
        topics: ['الوراثة الجزيئية', 'التنفس الخلوي والبناء الضوئي', 'التطبيقات الحيوية', 'أجهزة جسم الإنسان']
      }
    ]
  },
  {
    id: 'literary',
    title: 'الثانوية العامة - الفرع الأدبي',
    icon: '📚',
    books: [
      {
        name: 'كتاب الرياضيات الأساسية - الأدبي',
        pages: '180 صفحة',
        size: '10 MB',
        topics: ['النهايات والاتصال', 'التفاضل وتطبيقاته', 'التكامل وقواعده', 'الإحصاء والاحتمالات']
      },
      {
        name: 'كتاب اللغة العربية (التخصص)',
        pages: '200 صفحة',
        size: '11 MB',
        topics: ['البلاغة والنقد الأدبي', 'الإبستيمولوجيا والنحو العربي', 'العروض والقوافي', 'النصوص الأدبية القديمة والحديثة']
      },
      {
        name: 'كتاب التاريخ - الأردن والعالم',
        pages: '210 صفحة',
        size: '13 MB',
        topics: ['الثورة العربية الكبرى', 'تاريخ الأردن المعاصر', 'الحركات الوطنية والتحررية', 'المنظمات الدولية']
      },
      {
        name: 'كتاب الجغرافيا - المناهج الأردنية',
        pages: '190 صفحة',
        size: '12 MB',
        topics: ['الخريطة الرقمية ونظم المعلومات الجغرافية', 'الجغرافيا البشرية', 'مشكلات البيئة العالمية', 'جغرافية الأردن']
      }
    ]
  },
  {
    id: 'technology',
    title: 'الثانوية العامة - فرع الحوسبة وتكنولوجيا المعلومات',
    icon: '💻',
    books: [
      {
        name: 'كتاب البرمجة وتطوير الويب',
        pages: '250 صفحة',
        size: '18 MB',
        topics: ['أساسيات تطوير الواجهات الأمامية HTML و CSS', 'لغة JavaScript المتقدمة وتطبيقاتها', 'بناء الخوادم ومتحكمات Node.js', 'أنظمة قواعد البيانات العلائقية']
      },
      {
        name: 'كتاب الشبكات وأمن المعلومات',
        pages: '210 صفحة',
        size: '14 MB',
        topics: ['نموذج الاتصال المعياري OSI', 'بروتوكولات التوجيه وأمن الشبكات', 'أنظمة جدران الحماية Firewalls', 'التشفير وحماية البيانات']
      },
      {
        name: 'كتاب قواعد البيانات وهياكل البيانات',
        pages: '190 صفحة',
        size: '11 MB',
        topics: ['مخطط العلاقات الكيانية ERD', 'لغة الاستعلام المهيكلة SQL', 'هياكل البيانات الأساسية (المصفوفات، القوائم)', 'خوارزميات البحث والترتيب']
      }
    ]
  }
];

export default function BooksView({ showToast, onSelectTopicFor3D }) {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleTransformTo3D = (topicName, bookName) => {
    showToast(`جاري تحويل درس (${topicName}) من كتاب (${bookName}) إلى محاكاة 3D تفاعلية 🚀`);
    if (onSelectTopicFor3D) {
      onSelectTopicFor3D(`اشرح لي درس: ${topicName} من كتاب ${bookName} بطريقة كرتونية ومحاكاة 3D`);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'right', color: '#E6EDF3', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#FFD700', marginBottom: '6px', fontSize: '1.2rem' }}>📚 مكتبة كتب الوزارة الأردنية للتوجيهي والتحويل الذكي لـ 3D</h2>
      <p style={{ color: '#8B949E', fontSize: '0.85rem', marginBottom: '20px' }}>
        اختر الفرع الدراسي، ثم الكتاب، وانقر على أي موضوع رئيسي لتحويله فوراً إلى شرح كرتوني وبيئة تعليمية تفاعلية ثلاثية الأبعاد!
      </p>

      {!selectedBranch ? (
        // عرض الفروع الدراسية الرئيسية
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px' }}>
          {jordanTawjihiCurriculum.map((branch) => (
            <div 
              key={branch.id} 
              onClick={() => setSelectedBranch(branch)}
              style={{ background: '#161B22', border: '1px solid rgba(255, 215, 0, 0.4)', borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: '0.2s', textAlign: 'center' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FFD700'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.4)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{branch.icon}</div>
              <h3 style={{ color: '#FFD700', fontSize: '1rem', marginBottom: '8px' }}>{branch.title}</h3>
              <span style={{ color: '#8B949E', fontSize: '0.75rem' }}>{branch.books.length} كتب وزارية معتمدة</span>
            </div>
          ))}
        </div>
      ) : !selectedBook ? (
        // عرض كتب الفرع المحدد
        <div>
          <button 
            onClick={() => setSelectedBranch(null)}
            style={{ background: 'transparent', border: '1px solid #FFD700', color: '#FFD700', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', marginBottom: '15px', fontSize: '0.8rem' }}
          >
            ← عودة لاختيار الفروع
          </button>
          <h3 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '15px' }}>{selectedBranch.icon} {selectedBranch.title} - الكتب المتاحة:</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {selectedBranch.books.map((book, idx) => (
              <div key={idx} style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: '#E6EDF3', fontSize: '0.95rem', marginBottom: '6px' }}>{book.name}</h4>
                  <span style={{ color: '#8B949E', fontSize: '0.75rem', display: 'block', marginBottom: '12px' }}>عدد الصفحات: {book.pages} | الحجم: {book.size}</span>
                </div>
                <button 
                  className="gold-primary-btn" 
                  style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  onClick={() => setSelectedBook(book)}
                >
                  استعراض مواضيع الكتاب 📖
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // عرض مواضيع الكتاب المحدد وإمكانية توليد الـ 3D لها
        <div>
          <button 
            onClick={() => setSelectedBook(null)}
            style={{ background: 'transparent', border: '1px solid #FFD700', color: '#FFD700', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', marginBottom: '15px', fontSize: '0.8rem' }}
          >
            ← عودة لقائمة الكتب
          </button>
          <h3 style={{ color: '#FFD700', fontSize: '1.1rem', marginBottom: '6px' }}>📖 {selectedBook.name}</h3>
          <p style={{ color: '#8B949E', fontSize: '0.8rem', marginBottom: '15px' }}>اختر أي موضوع أدناه لشرحه كرتونياً ومحاكاته ثلاثية الأبعاد (3D):</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '750px' }}>
            {selectedBook.topics.map((topic, idx) => (
              <div key={idx} style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: '10px', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#E6EDF3', fontSize: '0.9rem' }}>{idx + 1}. {topic}</span>
                <button 
                  className="gold-primary-btn" 
                  style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                  onClick={() => handleTransformTo3D(topic, selectedBook.name)}
                >
                  تحويل لشرح 3D 🤖✨
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}