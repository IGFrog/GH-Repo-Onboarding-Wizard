import React from 'react';

const RepositoryCards = ({
  repoCounts,
  currentRepoFilter,
  onFilterChange,
  groupingStrategy,
  onGroupingChange,
  discoveredRepos,
  selectedRepos,
  onSelectedReposChange,
  integratedRepositories,
  onStartWizard,
  getFilteredRepos
}) => {
  const selectRepoFilter = (filter) => {
    onFilterChange(filter);
  };

  const updateGroupingStrategy = (strategy) => {
    onGroupingChange(strategy);
  };

  const generateProjectName = (groupName) => {
    return `Project-${groupName.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30);
  };

  const populateRepoSelection = () => {
    const strategy = groupingStrategy;
    const filteredRepos = getFilteredRepos();
    const groups = {};
    
    if (!strategy) {
      groups['All discovered repositories'] = filteredRepos;
    } else {
      filteredRepos.forEach(([repoName, repoDetails]) => {
        let groupKey;
        if (strategy === 'teams') {
          groupKey = (repoDetails.owners || []).sort().join(', ') || 'No Team Assigned';
        } else if (strategy === 'stages') {
          groupKey = (repoDetails.stages || []).sort().join(', ') || 'No Stage Assigned';
        } else {
          const owners = (repoDetails.owners || []).sort().join(', ') || 'No Team';
          const stages = (repoDetails.stages || []).sort().join(', ') || 'No Stage';
          groupKey = `${owners} | ${stages}`;
        }
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push([repoName, repoDetails]);
      });
    }
    
    return groups;
  };

  const groups = populateRepoSelection();

  return (
    <>
      {/* Repository Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`repo-card ${currentRepoFilter === 'all' ? 'selected' : ''} bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow`}
          onClick={() => selectRepoFilter('all')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="repo-card-label font-semibold text-slate-800">All GH Repositories</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">{repoCounts.all}</p>
            </div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div 
          className={`repo-card ${currentRepoFilter === 'integrated' ? 'selected' : ''} bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow`}
          onClick={() => selectRepoFilter('integrated')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="repo-card-label font-semibold text-slate-800">Integrated Repositories</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">{repoCounts.integrated}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div 
          className={`repo-card ${currentRepoFilter === 'not-integrated' ? 'selected' : ''} bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow`}
          onClick={() => selectRepoFilter('not-integrated')}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="repo-card-label font-semibold text-slate-800">Not Integrated Repositories</h3>
              <p className="text-2xl font-bold text-orange-600 mt-1">{repoCounts.notIntegrated}</p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <nav className="flex gap-x-6">
            <a href="#" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">GitHub</a>
          </nav>
        </div>
        <div className="p-6">
          {/* Grouping Options */}
          {currentRepoFilter === 'not-integrated' && (
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-semibold text-slate-700 flex-shrink-0">Group repositories by:</h3>
                <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
                  <label className="radio-label">
                    <input 
                      type="checkbox" 
                      name="grouping" 
                      value="teams" 
                      className="sr-only" 
                      checked={groupingStrategy === 'teams'}
                      onChange={(e) => updateGroupingStrategy(e.target.checked ? 'teams' : null)}
                    />
                    <div className="radio-tile-compact cursor-pointer px-4 py-1 rounded-md text-sm">Teams</div>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="checkbox" 
                      name="grouping" 
                      value="stages" 
                      className="sr-only"
                      checked={groupingStrategy === 'stages'}
                      onChange={(e) => updateGroupingStrategy(e.target.checked ? 'stages' : null)}
                    />
                    <div className="radio-tile-compact cursor-pointer px-4 py-1 rounded-md text-sm">Stages</div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Repository Selection */}
          <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
            {Object.entries(groups).map(([groupName, groupRepos]) => {
              const suggestedProjectName = generateProjectName(groupName);
              const selectedReposInGroup = groupRepos.filter(([repoName]) => selectedRepos.includes(repoName));
              const hasSelectedRepos = selectedReposInGroup.length > 0;
              
              const groupTitle = !groupingStrategy ? 
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-slate-700">{groupName}</h4>
                  {hasSelectedRepos && (
                    <button 
                      onClick={() => onStartWizard(groupName)}
                      className="btn-primary px-4 py-2 rounded-md font-semibold text-sm"
                    >
                      Integrate
                    </button>
                  )}
                </div> : 
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h4 className="font-semibold text-slate-800">Suggested Project:</h4>
                    <input 
                      type="text" 
                      defaultValue={suggestedProjectName}
                      className="text-green-700 font-bold bg-slate-100 px-2 py-1 rounded-md border border-slate-200 focus:ring-2 focus:ring-green-700 focus:outline-none text-sm"
                    />
                  </div>
                  {hasSelectedRepos && (
                    <button 
                      onClick={() => onStartWizard(groupName)}
                      className="btn-primary px-4 py-2 rounded-md font-semibold text-sm"
                    >
                      Integrate
                    </button>
                  )}
                </div>;
              
              return (
                <div key={groupName} className="mb-4">
                  {groupTitle}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left text-slate-500">
                      <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                        <tr>
                          <th scope="col" className="p-4 w-12 text-center">
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 rounded border-slate-300 text-green-700 focus:ring-green-700"
                            />
                          </th>
                          <th scope="col" className="px-6 py-3">Repository Name</th>
                          <th scope="col" className="px-6 py-3">GH Stages</th>
                          <th scope="col" className="px-6 py-3">Owning Teams</th>
                          <th scope="col" className="px-6 py-3">JF Project</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupRepos.map(([repoName, repoDetails]) => {
                          const jfProjectCell = integratedRepositories.has(repoName) ? 
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Integrated</span> :
                            <span className="text-slate-400">Not integrated</span>;
                          
                          return (
                            <tr 
                              key={repoName}
                              className={`cursor-pointer ${selectedRepos.includes(repoName) ? 'selected-row' : ''}`}
                              onClick={() => {
                                if (selectedRepos.includes(repoName)) {
                                  onSelectedReposChange(selectedRepos.filter(r => r !== repoName));
                                } else {
                                  onSelectedReposChange([...selectedRepos, repoName]);
                                }
                              }}
                            >
                              <td className="p-4 text-center text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 24 24" fill="currentColor">
                                  <circle cx="9" cy="4" r="1.5"/>
                                  <circle cx="9" cy="12" r="1.5"/>
                                  <circle cx="9" cy="20" r="1.5"/>
                                  <circle cx="15" cy="4" r="1.5"/>
                                  <circle cx="15" cy="12" r="1.5"/>
                                  <circle cx="15" cy="20" r="1.5"/>
                                </svg>
                              </td>
                              <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{repoName}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center flex-wrap gap-1">
                                  {repoDetails.stages.length > 0 ? 
                                    repoDetails.stages.map(s => (
                                      <span key={s} className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-medium">
                                        {s}
                                      </span>
                                    )) : 
                                    <span className="text-slate-400">None</span>
                                  }
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center flex-wrap gap-1">
                                  {repoDetails.owners.map(o => (
                                    <span key={o} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                      {o}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4">{jfProjectCell}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepositoryCards;
