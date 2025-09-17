import React, { useState } from 'react';
import StagesStep from './wizard/StagesStep';
import TechnologiesStep from './wizard/TechnologiesStep';
import JFProjectsStep from './wizard/JFProjectsStep';
import JFrogApplicationsStep from './wizard/JFrogApplicationsStep';
import WorkflowsStep from './wizard/WorkflowsStep';
import CompleteStep from './wizard/CompleteStep';

const Wizard = ({
  currentProjectGroup,
  selectedRepos,
  discoveredRepos,
  wizardState,
  setWizardState,
  onComplete,
  onApply,
  onPreviewWorkflow
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const stepsOrder = ['Stages', 'Technologies', 'JF Projects', 'JFrog Applications', 'Workflows Integration', 'Complete'];

  const goToStep = (stepId) => {
    const stepIndex = stepsOrder.indexOf(stepId);
    setCurrentStepIndex(stepIndex);
  };

  const goNext = () => {
    const step = stepsOrder[currentStepIndex];
    
    if (step === 'Workflows Integration') {
      onComplete();
      return;
    }
    
    if (currentStepIndex < stepsOrder.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const updateProgressDots = () => {
    return stepsOrder.map((_, index) => (
      <div
        key={index}
        className={`progress-dot w-2 h-2 rounded-full ${
          index <= currentStepIndex ? 'bg-green-500' : 'bg-gray-300'
        }`}
      />
    ));
  };

  const renderCurrentStep = () => {
    const currentStep = stepsOrder[currentStepIndex];
    
    switch (currentStep) {
      case 'Stages':
        return (
          <StagesStep
            selectedRepos={selectedRepos}
            discoveredRepos={discoveredRepos}
            wizardState={wizardState}
            setWizardState={setWizardState}
            currentProjectGroup={currentProjectGroup}
          />
        );
      case 'Technologies':
        return (
          <TechnologiesStep
            selectedRepos={selectedRepos}
            discoveredRepos={discoveredRepos}
            wizardState={wizardState}
            setWizardState={setWizardState}
          />
        );
      case 'JF Projects':
        return (
          <JFProjectsStep
            selectedRepos={selectedRepos}
            discoveredRepos={discoveredRepos}
            wizardState={wizardState}
            setWizardState={setWizardState}
            currentProjectGroup={currentProjectGroup}
          />
        );
      case 'JFrog Applications':
        return (
          <JFrogApplicationsStep
            selectedRepos={selectedRepos}
            discoveredRepos={discoveredRepos}
            wizardState={wizardState}
            setWizardState={setWizardState}
            currentProjectGroup={currentProjectGroup}
          />
        );
      case 'Workflows Integration':
        return (
          <WorkflowsStep
            selectedRepos={selectedRepos}
            discoveredRepos={discoveredRepos}
            wizardState={wizardState}
            setWizardState={setWizardState}
            onPreviewWorkflow={onPreviewWorkflow}
          />
        );
      case 'Complete':
        return (
          <CompleteStep
            onApply={onApply}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div id="wizard-container">
        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-gray-800">GitHub Integration Setup</h2>
            <span className="text-xs text-gray-500">Step {currentStepIndex + 1} of {stepsOrder.length}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              {updateProgressDots()}
            </div>
          </div>
        </div>

        {/* Current Step */}
        <div className="wizard-step active">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between">
          <button
            onClick={goBack}
            className={`btn-secondary px-4 py-1.5 rounded-md font-semibold text-sm ${
              currentStepIndex === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          <button
            onClick={goNext}
            className="btn-primary px-4 py-1.5 rounded-md font-semibold text-sm ml-auto"
          >
            {stepsOrder[currentStepIndex] === 'Workflows Integration' ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
