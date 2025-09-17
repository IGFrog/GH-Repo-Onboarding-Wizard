import React from 'react';

const StagesStep = ({ selectedRepos, discoveredRepos, wizardState, setWizardState, currentProjectGroup }) => {
  const generateProjectName = (groupName) => {
    return `Project-${groupName.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30);
  };

  const sortStages = (stages) => {
    const order = ['dev', 'beta', 'staging', 'qa', 'performance', 'production', 'release'];
    const uniqueStages = [...new Set(stages)];
    const dev = uniqueStages.filter(s => s === 'dev');
    const prod = uniqueStages.filter(s => s === 'production' || s === 'release');
    const others = uniqueStages.filter(s => s !== 'dev' && s !== 'production' && s !== 'release');
    others.sort((a, b) => {
      const iA = order.indexOf(a);
      const iB = order.indexOf(b);
      if (iA > -1 && iB > -1) return iA - iB;
      if (iA > -1) return -1;
      if (iB > -1) return 1;
      return a.localeCompare(b);
    });
    return [...dev, ...others, ...prod];
  };

  const createStageTag = (stage) => {
    const isLocked = stage === 'dev' || stage === 'production';
    return (
      <span
        key={stage}
        className={`stage-tag inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
          isLocked ? 'bg-green-100 text-green-800 cursor-default' : 'bg-sky-100 text-sky-800 cursor-grab'
        }`}
        draggable={!isLocked}
      >
        {isLocked && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        )}
        <span>{stage}</span>
        {!isLocked && (
          <button className="flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-sky-600 hover:bg-sky-200 hover:text-sky-800">
            <svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        )}
      </span>
    );
  };

  const populateStagesView = () => {
    const projects = {};
    
    if (currentProjectGroup) {
      const projectName = generateProjectName(currentProjectGroup);
      projects[projectName] = { repos: selectedRepos };
    } else {
      for (const groupKey in wizardState.projects) {
        const project = wizardState.projects[groupKey];
        const projectRepos = project.repos.filter(r => selectedRepos.includes(r));
        if (projectRepos.length > 0) projects[project.name] = { repos: projectRepos };
      }
    }
    
    return projects;
  };

  const projects = populateStagesView();

  return (
    <div>
      <h1 className="text-lg font-semibold text-slate-800 mb-3">Configure Stages</h1>
      <div className="space-y-3">
        {Object.entries(projects).map(([projectName, projectData]) => {
          let allStages = new Set();
          projectData.repos.forEach(repoName => {
            (discoveredRepos[repoName].stages || []).forEach(stage => allStages.add(stage));
          });
          let suggestion = [...allStages];
          
          if (!suggestion.includes('dev')) suggestion.push('dev');
          if (!suggestion.includes('production')) suggestion.push('production');
          
          suggestion = sortStages(suggestion);
          
          const projectId = projectName.replace(/[^a-zA-Z0-9]/g, '');
          
          return (
            <div key={projectName} className="jfrog-card p-4">
              <h4 className="font-semibold text-slate-800 text-lg">{projectName}</h4>
              <p className="text-sm text-slate-500 mb-4">
                Contains {projectData.repos.length} repositories: {projectData.repos.join(', ')}
              </p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Suggested Stages (Drag to reorder):
                </label>
                <div className="flex items-center flex-wrap gap-2 p-2 rounded-lg border bg-slate-50 min-h-[44px]">
                  {suggestion.map(createStageTag)}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Add stage..."
                    className="block w-full sm:w-auto flex-grow px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                  />
                  <button className="btn-secondary px-4 py-1.5 rounded-md text-sm font-semibold">
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StagesStep;
