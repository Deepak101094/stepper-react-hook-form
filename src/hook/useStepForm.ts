import { useState } from "react";

export const useStepForm = (stepsCount: number) => {
	const [currentStep, setCurrentStep] = useState(0);

	function next() {
		setCurrentStep((prevStep) => {
			if (prevStep === stepsCount - 1) return prevStep;
			return prevStep + 1;
		});
	}

	function back() {
		setCurrentStep((prevStep) => {
			if (currentStep === 0) return prevStep;
			return prevStep - 1;
		});
	}

	return {
		currentStep,
		next,
		back,
		// isFirstStep: currentStep === 0,
		// isLastStep: currentStep === steps.length - 1,
	};
};
