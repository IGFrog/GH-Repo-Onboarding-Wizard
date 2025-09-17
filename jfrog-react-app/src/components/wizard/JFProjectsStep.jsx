import React from 'react';

const JFProjectsStep = ({ selectedRepos, discoveredRepos, wizardState, setWizardState, currentProjectGroup }) => {
  const generateProjectName = (groupName) => {
    return `Project-${groupName.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30);
  };

  const getMaturity = (stage) => {
    const map = { 'production': 'prod', 'staging': 'stg', 'release': 'rel', 'beta': 'beta', 'dev': 'dev' };
    return map[stage] || stage.substring(0, 4);
  };

  const icons = {
    PyPI: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.42 6.58a1 1 0 011.12 0l2.5 2.5a1 1 0 010 1.42l-2.5 2.5a1 1 0 01-1.42-1.42L11.59 10 9.7 8.11a1 1 0 010-1.42l-.28-.28zM5.58 6.58a1 1 0 011.42 0L10 9.59l-1.89 1.89a1 1 0 01-1.42-1.42l2.5-2.5a1 1 0 010-1.42l-.28-.28a1 1 0 010-1.42z" clip-rule="evenodd" /></svg>`,
    Docker: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.789 0l-7 14a1 1 0 001.169 1.409l5-1.428a1 1 0 00.475 0l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>`,
    Maven: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" /></svg>`,
    Npm: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.5 4a1.5 1.5 0 013 0V11a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" /></svg>`,
    Generic: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>`,
    Go: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clip-rule="evenodd" /><path d="M10.293 6.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 8.414V13a1 1 0 11-2 0V8.414L6.707 10.707a1 1 0 01-1.414-1.414l3-3z" /></svg>`,
    Nuget: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 2.5 13.5 2.5 15.5a2.5 2.5 0 105 0c0-1.99-1.24-3.653-2.92-4.43l.892-.893 5.432 1.358a.997.997 0 00.042.01L17 12.18V17a1 1 0 102 0V3a1 1 0 00-2 0v1.22l-1.222.305a.997.997 0 00-.042.01L12.08 5.89l-.893-.892C12.154 3.74 13.5 2.5 15.5 2.5a2.5 2.5 0 100-5c-1.99 0-3.653 1.24-4.43 2.92l-.893.892L4.712 1.358a.997.997 0 00-.01-.042L4.4 1H3z" /></svg>`,
    Helm: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a.75.75 0 01.75.75v3.438a.75.75 0 01-.322.628l-2.678 1.859a.75.75 0 000 1.256l2.678 1.859a.75.75 0 01.322.628v3.438a.75.75 0 01-1.5 0v-2.56l-1.632-1.134a.75.75 0 010-1.256L8.5 7.188V4.625a.75.75 0 010-1.5H6.25a.75.75 0 000 1.5h.5v2.875L4.822 9.375a.75.75 0 000 1.25l1.928 1.339V15.5a.75.75 0 001.5 0v-2.875l1.928-1.339a.75.75 0 000-1.25L7.75 8.661V4.625a.75.75 0 00-1.5 0V3.5a.75.75 0 01.75-.75h2.5z" /></svg>`
  };

  // Get project information
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
      return (
        <div>
          <h1 className="text-lg font-semibold text-slate-800 mb-3">JF Projects</h1>
          <div className="jfrog-card p-6 text-center text-slate-500">No project data available.</div>
        </div>
      );
    }
  }

  const sortedStages = wizardState.finalStages[projectName] || ['dev', 'production'];
  const technologies = wizardState.finalTechnologies || ['Npm', 'Docker'];
  const projectKey = projectName.replace('Project-', '').split('-').map(w => w.substring(0,2)).join('').toUpperCase();

  return (
    <div>
      <h1 className="text-lg font-semibold text-slate-800 mb-3">JF Projects</h1>
      <div className="jfrog-card">
        <div className="p-6">
          <h4 className="font-semibold text-slate-800 text-lg">{projectName}</h4>
          <p className="text-sm text-slate-500">Contains {projectRepos.length} repositories: {projectRepos.join(', ')}</p>
        </div>
        <div className="border-t border-slate-200">
          <div className="px-6 py-3 bg-slate-50/50">
            <h4 className="text-sm font-semibold text-slate-700">Suggested Artifactory Repository Structure</h4>
          </div>
          <div className="border-t border-slate-200">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex gap-x-6 px-6">
                {sortedStages.length > 0 ? sortedStages.map((stage, stageIdx) => (
                  <button
                    key={stage}
                    className={`tab-button jf ${stageIdx === 0 ? 'active' : ''} shrink-0 border-b-2 border-transparent px-1 py-3 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700`}
                  >
                    {stage}
                  </button>
                )) : (
                  <button className="tab-button jf active shrink-0 border-b-2 border-transparent px-1 py-3 text-sm text-slate-500">
                    Generic (No Stage)
                  </button>
                )}
              </nav>
            </div>
            <div className="p-4">
              {sortedStages.map((stage, stageIdx) => {
                let repoListHtml = '';
                technologies.forEach(tech => {
                  const techLower = tech.toLowerCase();
                  const maturity = getMaturity(stage);
                  
                  if (stage === 'dev') {
                    repoListHtml += `
                      <li class="py-3 flex items-start gap-4">
                        <div class="flex items-center gap-2 w-24 flex-shrink-0 pt-1.5">
                          <span dangerouslySetInnerHTML='${icons[tech] || ''}'></span>
                          <span class="font-medium text-sm text-slate-800">${tech}</span>
                        </div>
                        <div class="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div class="flex items-center justify-between gap-2 bg-slate-100 px-3 py-1 rounded-md text-xs">
                            <span class="font-mono truncate" title="${projectKey}-${techLower}-${maturity}-virtual">${projectKey}-${techLower}-${maturity}-virtual</span>
                            <span class="font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">virtual</span>
                          </div>
                          <div class="flex items-center justify-between gap-2 bg-slate-100 px-3 py-1 rounded-md text-xs">
                            <span class="font-mono truncate" title="${projectKey}-${techLower}-remote">${projectKey}-${techLower}-remote</span>
                            <span class="font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">remote</span>
                          </div>
                          <div class="flex items-center justify-between gap-2 bg-slate-100 px-3 py-1 rounded-md text-xs">
                            <span class="font-mono truncate" title="${projectKey}-${techLower}-${maturity}-local">${projectKey}-${techLower}-${maturity}-local</span>
                            <span class="font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">local</span>
                          </div>
                        </div>
                      </li>
                    `;
                  } else {
                    repoListHtml += `
                      <li class="py-2 flex items-center gap-4">
                        <div class="flex items-center gap-2 w-24 flex-shrink-0">
                          <span dangerouslySetInnerHTML='${icons[tech] || ''}'></span>
                          <span class="font-medium text-sm text-slate-800">${tech}</span>
                        </div>
                        <div class="flex-grow text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-md font-mono">
                          ${projectKey}-${techLower}-${maturity}-local
                        </div>
                        <div class="w-20 text-right">
                          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">local</span>
                        </div>
                      </li>
                    `;
                  }
                });
                
                return (
                  <div key={stage} className={`tab-content jf ${stageIdx === 0 ? 'active' : ''}`}>
                    <ul className="divide-y divide-slate-100" dangerouslySetInnerHTML={{ __html: repoListHtml }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JFProjectsStep;
