import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RepositoryCards from './components/RepositoryCards';
import Wizard from './components/Wizard';
import WorkflowPreviewModal from './components/WorkflowPreviewModal';

// Mock data
const teamNames = ['Team Phoenix', 'Team Nebula', 'Team Apex', 'Team Orion', 'Team Citadel'];
const repoNames = [
  'monolith-service', 'design-system-v2', 'data-pipeline-etl', 'mobile-app-ios', 'web-analytics-dashboard',
  'infra-terraform-modules', 'ml-model-training', 'api-gateway', 'customer-support-portal', 'auth-service',
  'billing-engine', 'notification-service', 'product-catalog-api', 'checkout-flow-ui', 'search-service-es',
  'video-processing-worker', 'documentation-site', 'internal-tool-admin', 'data-warehouse-scripts', 'security-scanner'
];
const allStages = ['dev', 'qa', 'staging', 'performance', 'production', 'release', 'beta'];
const allTechnologies = ['Npm', 'Docker', 'Maven', 'PyPI', 'Generic', 'Helm', 'Go', 'Nuget', 'RubyGems', 'Conan', 'Cran', 'Gradle'];

const getRandomSubarray = (arr, count) => arr.sort(() => 0.5 - Math.random()).slice(0, count);

// Generate discovered repositories
const generateDiscoveredRepos = () => {
  return repoNames.reduce((acc, repoName) => {
    const numTeams = Math.floor(Math.random() * 3) + 1;
    const owners = getRandomSubarray([...teamNames], numTeams);
    const numStages = Math.floor(Math.random() * 4);
    const stages = getRandomSubarray([...allStages], numStages);
    const numTechs = Math.floor(Math.random() * 3) + 1;
    const technologies = getRandomSubarray([...allTechnologies.slice(0,6)], numTechs);

    acc[repoName] = { 
      owners, 
      stages, 
      workflows: ['main.yml'], 
      data: technologies.map(tech => ({ package: `${repoName}-${tech.toLowerCase()}`, type: tech })) 
    };
    return acc;
  }, {});
};

function App() {
  const [discoveredRepos, setDiscoveredRepos] = useState({});
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [currentRepoFilter, setCurrentRepoFilter] = useState('all');
  const [groupingStrategy, setGroupingStrategy] = useState(null);
  const [integratedRepositories, setIntegratedRepositories] = useState(new Set());
  const [showWizard, setShowWizard] = useState(false);
  const [currentProjectGroup, setCurrentProjectGroup] = useState(null);
  const [wizardState, setWizardState] = useState({
    projects: {},
    finalStages: {},
    finalTechnologies: [],
    jfrogApplications: [],
    workflowsByRepo: {}
  });
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [workflowPreview, setWorkflowPreview] = useState({ repoName: '', workflowName: '', snippet: '' });

  useEffect(() => {
    setDiscoveredRepos(generateDiscoveredRepos());
  }, []);

  const getFilteredRepos = () => {
    const allRepos = Object.entries(discoveredRepos);
    if (currentRepoFilter === 'all') {
      return allRepos;
    } else if (currentRepoFilter === 'integrated') {
      return allRepos.filter(([repoName]) => integratedRepositories.has(repoName));
    } else if (currentRepoFilter === 'not-integrated') {
      return allRepos.filter(([repoName]) => !integratedRepositories.has(repoName));
    }
    return allRepos;
  };

  const updateRepoCounts = () => {
    const allRepos = Object.keys(discoveredRepos).length;
    const integratedRepos = integratedRepositories.size;
    const notIntegratedRepos = allRepos - integratedRepos;
    
    return {
      all: allRepos,
      integrated: integratedRepos,
      notIntegrated: notIntegratedRepos
    };
  };

  const startWizardForProject = (groupName) => {
    const groupRepos = Object.entries(discoveredRepos)
      .filter(([repoName, repoDetails]) => {
        if (groupingStrategy === 'teams') {
          const groupKey = (repoDetails.owners || []).sort().join(', ') || 'No Team Assigned';
          return groupKey === groupName;
        } else if (groupingStrategy === 'stages') {
          const groupKey = (repoDetails.stages || []).sort().join(', ') || 'No Stage Assigned';
          return groupKey === groupName;
        } else if (groupingStrategy === 'teams_and_stages') {
          const owners = (repoDetails.owners || []).sort().join(', ') || 'No Team';
          const stages = (repoDetails.stages || []).sort().join(', ') || 'No Stage';
          const groupKey = `${owners} | ${stages}`;
          return groupKey === groupName;
        } else {
          return true;
        }
      })
      .map(([repoName]) => repoName);
    
    setSelectedRepos([...groupRepos]);
    setCurrentProjectGroup(groupName);
    setShowWizard(true);
  };

  const applyConfiguration = () => {
    if (currentProjectGroup) {
      const projectName = `Project-${currentProjectGroup.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30);
      
      selectedRepos.forEach(repoName => {
        setIntegratedRepositories(prev => new Set([...prev, repoName]));
      });
      
      setWizardState(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          [currentProjectGroup]: { name: projectName, repos: selectedRepos }
        }
      }));
    }
    
    setShowWizard(false);
    setCurrentProjectGroup(null);
    setGroupingStrategy(null);
    setSelectedRepos([]);
    alert('Configuration applied successfully!');
  };

  const completeWizard = () => {
    const projectName = currentProjectGroup ? 
      `Project-${currentProjectGroup.replace(/[^a-zA-Z0-9-]/g, '').replace(/, /g, '-')}`.slice(0, 30) : '';
    
    selectedRepos.forEach(repoName => {
      setIntegratedRepositories(prev => new Set([...prev, repoName]));
    });
    
    setWizardState(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        [projectName]: { 
          name: projectName, 
          repos: [...selectedRepos],
          stages: prev.finalStages[projectName] || ['dev', 'production'],
          technologies: prev.finalTechnologies || ['Npm', 'Docker']
        }
      }
    }));
    
    setShowWizard(false);
    setCurrentProjectGroup(null);
    setGroupingStrategy(null);
    setSelectedRepos([]);
    
    alert(`Wizard completed successfully! Project "${projectName}" has been created and integrated with ${selectedRepos.length} repositories.`);
  };

  const previewWorkflowSnippet = (repoName, workflowName) => {
    // Generate workflow snippet (simplified version)
    const snippet = `# Add JFrog CLI setup
- name: Setup JFrog CLI
  uses: jfrog/setup-jfrog-cli@v2
  with:
    version: latest

# Configure JFrog CLI
- name: Configure JFrog CLI
  run: |
    jf c add --interactive=false --url=\\$\\{\\{ secrets.JFROG_URL \\}\\} --user=\\$\\{\\{ secrets.JFROG_USER \\}\\} --password=\\$\\{\\{ secrets.JFROG_TOKEN \\}\\}
    
    # Configure dev stage virtual repository for dependencies
    jf rt use project-npm-dev-virtual
    jf rt use project-docker-dev-virtual

# Download dependencies and upload build outputs
- name: Build with JFrog
  run: |
    # Download dependencies from virtual repository
    jf rt download project-npm-dev-virtual/ --flat=false
    jf rt download project-docker-dev-virtual/ --flat=false
    
    # Your build commands here
    # npm install && npm run build
    
    # Upload build outputs to dev local repository
    jf rt upload "dist/*" project-npm-dev-local/
    jf rt upload "*.tar" project-docker-dev-local/`;

    setWorkflowPreview({ repoName, workflowName, snippet });
    setShowWorkflowModal(true);
  };

  const repoCounts = updateRepoCounts();

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-slate-800 mb-4">GitHub Integration</h1>
          <p className="text-slate-600 mb-6">Connect your GitHub repositories to JFrog Platform for seamless artifact management.</p>
          
          {!showWizard ? (
            <>
              <RepositoryCards 
                repoCounts={repoCounts}
                currentRepoFilter={currentRepoFilter}
                onFilterChange={setCurrentRepoFilter}
                groupingStrategy={groupingStrategy}
                onGroupingChange={setGroupingStrategy}
                discoveredRepos={discoveredRepos}
                selectedRepos={selectedRepos}
                onSelectedReposChange={setSelectedRepos}
                integratedRepositories={integratedRepositories}
                onStartWizard={startWizardForProject}
                getFilteredRepos={getFilteredRepos}
              />
            </>
          ) : (
            <Wizard
              currentProjectGroup={currentProjectGroup}
              selectedRepos={selectedRepos}
              discoveredRepos={discoveredRepos}
              wizardState={wizardState}
              setWizardState={setWizardState}
              onComplete={completeWizard}
              onApply={applyConfiguration}
              onPreviewWorkflow={previewWorkflowSnippet}
            />
          )}
        </main>
      </div>

      {showWorkflowModal && (
        <WorkflowPreviewModal
          workflowPreview={workflowPreview}
          onClose={() => setShowWorkflowModal(false)}
        />
      )}
    </div>
  );
}

export default App;