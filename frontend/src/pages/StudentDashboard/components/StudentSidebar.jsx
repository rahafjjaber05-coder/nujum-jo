import React from 'react';

export function StudentSidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'books', label: '📚 الكتب التفاعلية والفصول' },
    { id: 'homework', label: '📝 الواجبات والمهام' },
    { id: 'restChat', label: '🤖 المساعد الذكي' },
    { id: 'profile', label: '👤 الملف الشخصي والتقدم' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 border-l border-slate-800 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="text-xs text-slate-500 px-3 mb-4 font-semibold uppercase tracking-wider">
          القائمة الرئيسية
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full text-right px-4 py-3 rounded-xl transition-all font-medium text-sm flex items-center space-x-3 space-x-reverse ${
              activeView === item.id
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-sm'
                : 'hover:bg-slate-800 hover:text-white text-slate-400'
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}