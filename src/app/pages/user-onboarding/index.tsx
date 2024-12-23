import CardLayout from "@components/card/Card";
import Wrapper from "@components/wrapper";
import CompanyDetails from "@/app/components/onboarding-steps/CompanyDetails";
import { useEffect, useState } from "react";
import Feedback from "@/app/components/onboarding-steps/Feedback";
import { useSearchParams } from "react-router-dom";
import CustomStepper from "@/app/components/onboarding-steps/CustomSteps";
import { motion } from "framer-motion";

const UserOnboarding = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep = parseInt(searchParams.get("step") || "1", 10);
  const [activeStep, setActiveStep] = useState(initialStep);

  const STEPS_LENGTH = 2;

  const goToNextStep = () => {
    if (activeStep < STEPS_LENGTH) {
      setActiveStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setSearchParams({ step: activeStep.toString() });
  }, [activeStep, setSearchParams]);

  return (
    <Wrapper>
      <CardLayout containerProps={{ maxW: "3xl" }}>
        <CustomStepper currentStep={activeStep} />
        <motion.div
          key={activeStep}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeStep === 1 ? (
            <CompanyDetails
              setActiveStep={goToNextStep}
              activeStep={activeStep}
            />
          ) : (
            <Feedback activeStep={activeStep} />
          )}
        </motion.div>
      </CardLayout>
    </Wrapper>
  );
};

export default UserOnboarding;
