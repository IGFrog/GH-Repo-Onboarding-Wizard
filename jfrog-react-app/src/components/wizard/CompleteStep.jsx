import React from 'react';

const CompleteStep = ({ onApply }) => {
  return (
    <div className="text-center py-6">
      <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-lg font-bold text-slate-800 mt-3">Configuration Complete!</h2>
      <p className="text-slate-500 mt-2 mb-6">Your onboarding setup is ready.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button 
          onClick={onApply}
          className="btn-primary px-4 py-2 rounded-md font-semibold text-sm"
        >
          Apply Configuration
        </button>
        <button className="btn-secondary px-4 py-2 rounded-md text-sm font-semibold">
          Export to Terraform
        </button>
      </div>
    </div>
  );
};

export default CompleteStep;
