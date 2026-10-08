import React from 'react';

export function StudentNavbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-slate-800">
      <div className="flex items-center space-x-3 space-x-reverse">
        <span className="text-2xl">⭐</span>
        <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-200 bg-clip-text text-transparent">
          نُجُم التعليم - لوحة الطالبة
        </h1>
      </div>
      <div className="flex items-center space-x-4 space-x-reverse">
        <span className="text-sm bg-slate-800 text-yellow-300 px-4 py-1.5 rounded-full border border-yellow-500/30">
          مرحباً بكِ، رهف ✨
        </span>
      </div>
    </nav>
  );
}