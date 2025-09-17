import React from 'react';

const WorkflowsStep = ({ selectedRepos, discoveredRepos, wizardState, setWizardState, onPreviewWorkflow }) => {
  // Detect workflows for selected repositories
  const workflowsByRepo = {};
  selectedRepos.forEach(repoName => {
    const repoDetails = discoveredRepos[repoName];
    if (repoDetails.workflows && repoDetails.workflows.length > 0) {
      workflowsByRepo[repoName] = repoDetails.workflows;
    }
  });

  const totalWorkflows = Object.values(workflowsByRepo).flat().length;

  return (
    <div>
      <h1 className="text-lg font-semibold text-slate-800 mb-3">Workflows Integration</h1>
      <div className="jfrog-card p-6">
        <h4 className="font-semibold text-slate-800 text-lg mb-4">Workflows Integration</h4>
        <p className="text-sm text-slate-500 mb-6">Add JFrog CLI integration to your GitHub Actions workflows.</p>
        
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h5 className="font-medium text-slate-700 mb-2">Detected Workflows</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Repositories with workflows:</span>
                <span className="font-medium text-slate-800 ml-2">{Object.keys(workflowsByRepo).length}</span>
              </div>
              <div>
                <span className="text-slate-500">Total workflows found:</span>
                <span className="font-medium text-slate-800 ml-2">{totalWorkflows}</span>
              </div>
            </div>
          </div>
          
          {/* Workflows by Repository */}
          {Object.keys(workflowsByRepo).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(workflowsByRepo).map(([repoName, workflows]) => (
                <div key={repoName} className="border border-slate-200 rounded-lg p-4">
                  <h5 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    </svg>
                    {repoName}
                  </h5>
                  <div className="space-y-4">
                    {workflows.map(workflow => (
                      <div key={workflow} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h6 className="font-medium text-slate-800">{workflow}</h6>
                            <p className="text-xs text-slate-500 mt-1">Repository: {repoName}</p>
                          </div>
                          <button
                            onClick={() => onPreviewWorkflow(repoName, workflow)}
                            className="btn-secondary px-3 py-1.5 rounded-md text-sm font-semibold"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg p-6 text-center text-slate-500">
              <svg className="h-12 w-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="font-medium">No GitHub Actions workflows found</p>
              <p className="text-sm mt-1">No .github/workflows/ files were detected in the selected repositories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowsStep;
