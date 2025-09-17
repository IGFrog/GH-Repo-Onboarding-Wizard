import React, { useState, useEffect } from 'react';

const JFrogApplicationsStep = ({ selectedRepos, discoveredRepos, wizardState, setWizardState, currentProjectGroup }) => {
  const [appSuggestions, setAppSuggestions] = useState([]);

  const generateProjectName = (groupName) => {
    return `Project-${groupName.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30);
  };

  const generateAppKey = (repoName) => {
    const cleanName = repoName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${cleanName}-${randomSuffix}`;
  };

  useEffect(() => {
    // Get the current project information
    let projectName, projectRepos;
    if (currentProjectGroup) {
      projectName = generateProjectName(currentProjectGroup);
      projectRepos = selectedRepos;
    } else {
      const firstProject = Object.values(wizardState.projects)[0];
      if (firstProject) {
        projectName = firstProject.name;
        projectRepos = firstProject.repos;
      } else {
        return;
      }
    }

    // Generate suggested app keys for each repository
    const suggestions = projectRepos.map(repoName => ({
      repoName: repoName,
      suggestedAppKey: generateAppKey(repoName),
      createApp: false
    }));

    setAppSuggestions(suggestions);
    setWizardState(prev => ({ ...prev, jfrogApplications: suggestions }));
  }, [selectedRepos, currentProjectGroup, wizardState.projects]);

  const updateAppKey = (index, newKey) => {
    const updated = [...appSuggestions];
    updated[index].suggestedAppKey = newKey;
    setAppSuggestions(updated);
    setWizardState(prev => ({ ...prev, jfrogApplications: updated }));
  };

  const regenerateAppKey = (index) => {
    const updated = [...appSuggestions];
    updated[index].suggestedAppKey = generateAppKey(updated[index].repoName);
    setAppSuggestions(updated);
    setWizardState(prev => ({ ...prev, jfrogApplications: updated }));
  };

  const toggleAppCreation = (index, createApp) => {
    const updated = [...appSuggestions];
    updated[index].createApp = createApp;
    setAppSuggestions(updated);
    setWizardState(prev => ({ ...prev, jfrogApplications: updated }));
  };

  if (appSuggestions.length === 0) {
    return (
      <div>
        <h1 className="text-lg font-semibold text-slate-800 mb-3">JFrog Applications</h1>
        <div className="jfrog-card p-6 text-center text-slate-500">No project data available.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-slate-800 mb-3">JFrog Applications</h1>
      <div className="jfrog-card">
        <div className="p-6">
          <h4 className="font-semibold text-slate-800 text-lg mb-2">JFrog Applications</h4>
          <p className="text-sm text-slate-500 mb-6">
            Create JFrog applications for each repository. App keys will be added to the .jfrog folder in each GitHub repository.
          </p>
          
          <div className="space-y-4">
            {appSuggestions.map((app, index) => (
              <div key={app.repoName} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-slate-800 mb-2">{app.repoName}</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Suggested App Key:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={app.suggestedAppKey}
                            onChange={(e) => updateAppKey(index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm font-mono bg-slate-50"
                          />
                          <button
                            onClick={() => regenerateAppKey(index)}
                            className="btn-secondary px-3 py-2 rounded-md text-sm font-semibold"
                          >
                            Regenerate
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={app.createApp}
                            onChange={(e) => toggleAppCreation(index, e.target.checked)}
                            className="h-4 w-4 border-slate-300 text-green-700 focus:ring-green-700 rounded"
                          />
                          <span className="ml-2 text-sm text-slate-700">Create JFrog Application</span>
                        </label>
                      </div>
                      
                      {app.createApp && (
                        <div className="bg-slate-50 p-3 rounded-md">
                          <div className="text-sm text-slate-600">
                            <p className="mb-2"><strong>What will be created:</strong></p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>
                                JFrog Application with key: <code className="bg-white px-1 rounded">{app.suggestedAppKey}</code>
                              </li>
                              <li>
                                File: <code className="bg-white px-1 rounded">.jfrog/app-key.json</code> in repository
                              </li>
                              <li>Integration with JFrog Platform services</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">About JFrog Applications</p>
                <p>
                  JFrog Applications provide secure access to JFrog Platform services. Each application gets a unique key 
                  that will be stored in your repository's .jfrog folder for use in CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JFrogApplicationsStep;
