import React from 'react';

const WorkflowPreviewModal = ({ workflowPreview, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(workflowPreview.snippet).then(() => {
      // Show success feedback
      const button = event.target;
      const originalText = button.innerText;
      button.innerText = 'Copied!';
      button.classList.add('bg-green-600', 'text-white');
      button.classList.remove('btn-secondary');
      
      setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove('bg-green-600', 'text-white');
        button.classList.add('btn-secondary');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Workflow Integration Preview</h3>
            <p className="text-sm text-slate-500 mt-1">{workflowPreview.workflowName} in {workflowPreview.repoName}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="mb-4">
            <h4 className="font-medium text-slate-700 mb-2">Add this code to your workflow:</h4>
            <p className="text-sm text-slate-500">Copy and paste the following YAML snippet into your {workflowPreview.workflowName} workflow file.</p>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{workflowPreview.snippet}</pre>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={copyToClipboard} className="btn-secondary px-4 py-2 rounded-md text-sm font-semibold">
              Copy to Clipboard
            </button>
            <button onClick={onClose} className="btn-primary px-4 py-2 rounded-md text-sm font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPreviewModal;
