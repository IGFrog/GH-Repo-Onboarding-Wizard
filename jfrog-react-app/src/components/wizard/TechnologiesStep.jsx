import React from 'react';

const TechnologiesStep = ({ selectedRepos, discoveredRepos, wizardState, setWizardState }) => {
  const allTechnologies = ['Npm', 'Docker', 'Maven', 'PyPI', 'Generic', 'Helm', 'Go', 'Nuget', 'RubyGems', 'Conan', 'Cran', 'Gradle'];
  
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

  const createTechTag = (tech, isDetected = false) => {
    return (
      <span
        key={tech}
        className={`tech-tag inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
          isDetected ? 'bg-slate-200 text-slate-800' : 'bg-sky-100 text-sky-800'
        }`}
      >
        <span dangerouslySetInnerHTML={{ __html: icons[tech] || '' }} />
        <span>{tech}</span>
        <button className="flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-slate-600 hover:bg-slate-300 hover:text-slate-800">
          <svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      </span>
    );
  };

  // Get detected technologies from selected repositories
  let techs = new Set();
  selectedRepos.forEach(repoName => {
    if (discoveredRepos[repoName] && discoveredRepos[repoName].data) {
      discoveredRepos[repoName].data.forEach(p => techs.add(p.type));
    }
  });

  const detectedTechnologies = [...techs];
  const unselected = allTechnologies.filter(t => !techs.has(t));

  return (
    <div>
      <h1 className="text-lg font-semibold text-slate-800 mb-3">Review Package Managers</h1>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Detected & Added Package Managers:
          </label>
          <div className="flex items-center flex-wrap gap-2 p-2 rounded-lg border bg-slate-50 min-h-[44px]">
            {detectedTechnologies.map(tech => createTechTag(tech, true))}
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="add-tech-select" className="block text-sm font-medium text-slate-700">
            Add another package manager
          </label>
          <div className="flex items-center gap-2 mt-1">
            <select
              id="add-tech-select"
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-700 focus:ring-green-700 sm:text-sm"
            >
              <option disabled selected value="">Choose a type...</option>
              {unselected.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button className="btn-secondary px-4 py-1.5 rounded-md text-sm font-semibold">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesStep;
