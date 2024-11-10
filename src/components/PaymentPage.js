import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Stepper from './Stepper';
import PersonalDetailsForm from './PersonalDetailsForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';

const PaymentPage = () => {
  const router = useRouter();
  const { query } = router;  // Extract query parameters from the URL

  const [currentStep, setCurrentStep] = useState(1);

  // State to store the user's name, email, and phone (not affected by query)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // State to store car-related form data
  const [carFormData, setCarFormData] = useState({
    departure: '',
    returnLocation: '',
    pickUpDate: '',
    pickUpTime: '',
    returnDate: '',
    returnTime: '',
    driverOption: null,
    reg_num: ''
  });

  useEffect(() => {
    // Set the user data (name, email, phone) from the query params
    if (query.name && query.email && query.phone) {
      setUserData({
        name: query.name,
        email: query.email,
        phone: query.phone
      });
    }

    // Set the car-related data from the query params
    if (query.departure) {
      setCarFormData({
        departure: query.departure || '',
        returnLocation: query.returnLocation || '',
        pickUpDate: query.pickUpDate || '',
        pickUpTime: query.pickUpTime || '',
        returnDate: query.returnDate || '',
        returnTime: query.returnTime || '',
        driverOption: query.driverOption || null,
        reg_num: query.reg_num || ''
      });
    }
  }, [query]);

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

  // Function to update car form data
  const updateCarFormData = (data) => {
    setCarFormData(data);
  };

  return (
    <div className="PaymentPageContainer">
      {/* Render Stepper only for steps 1 and 2 */}
      {currentStep < 3 && <Stepper currentStep={currentStep} onStepClick={onStepClick} />}

      {currentStep === 1 && (
        <PersonalDetailsForm nextStep={nextStep} updateFormData={setUserData} />
      )}

      {currentStep === 2 && (
        <PaymentForm
          nextStep={nextStep}
          prevStep={prevStep}
          userData={userData}  // Passing only user data (name, email, phone)
          carFormData={carFormData}  // Passing car-related form data
        />
      )}

      {currentStep === 3 && <Confirmation userData={userData} carFormData={carFormData} />}
    </div>
  );
};

export default PaymentPage;
