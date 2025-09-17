import React from 'react';

const Header = () => {
  return (
    <header className="jfrog-header p-4 flex justify-between items-center flex-shrink-0">
      <div>
        <span className="text-slate-500">Platform /</span>
        <span className="font-semibold text-slate-800">Administration</span>
      </div>
      <div className="flex items-center gap-4">
        <input 
          type="search" 
          placeholder="Search Admin Resources" 
          className="px-4 py-1.5 border border-slate-300 rounded-md text-sm"
        />
        <button className="bg-yellow-400 text-slate-800 font-semibold px-4 py-1.5 rounded-md text-sm">
          Ask AI
        </button>
      </div>
    </header>
  );
};

export default Header;
