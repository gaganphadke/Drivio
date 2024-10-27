import React, { useState } from 'react';
import Stepper from './Stepper';
import PersonalDetailsForm from './PersonalDetailsForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Function to move to the next step
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // Function to move to the previous step
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Function to handle step clicks in Stepper
  const onStepClick = (step) => {
    if (step === 1 && currentStep === 2) {
      setCurrentStep(1); // Allow navigation back to Step 1 from Step 2
    }
  };

  // Function to update form data
  const updateFormData = (data) => {
    setFormData(data);
  };

  return (
    <div className="PaymentPageContainer">
      {/* Render Stepper only for steps 1 and 2 */}
      {currentStep < 3 && <Stepper currentStep={currentStep} onStepClick={onStepClick} />}

      {currentStep === 1 && (
        <PersonalDetailsForm nextStep={nextStep} updateFormData={updateFormData} />
      )}

      {currentStep === 2 && (
        <PaymentForm nextStep={nextStep} prevStep={prevStep} userData={formData} />
      )}

      {currentStep === 3 && <Confirmation formData={formData} userData={formData} />}
    </div>
  );
};

export default PaymentPage;
