import Preview from "@/app/components/card/Preview";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import SVButton from "@/app/components/ui/button";
import { surveySelector } from "@/app/data/app/slices/surveySlice";
import { useAppSelector } from "@/store";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TbChevronCompactRight } from "react-icons/tb";
import { MultipleChoicePreview, SingleChoicePreview } from "./PreviewOptions";
import DeliveryMethodModal from "@/app/components/modal/DeliveryMethodModal";

const Title = () => {
  const [t] = useTranslation();

  return (
    <Flex align={{ sm: "center" }}>
      <Image src="/eye.svg" mr="2" />
      <Text
        fontSize={{ base: "sm", sm: "md" }}
        color="primary.800"
        fontWeight="medium"
      >
        {t("questions.previewSurvey")}
      </Text>
    </Flex>
  );
};

const SurveyPreview = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const [t] = useTranslation();

  const { questions } = useAppSelector(surveySelector.getCurrentSurvey);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    isOpen: isDeliveryOpen,
    onOpen: onDeliveryOpen,
    onClose: onDeliveryClose,
  } = useDisclosure();
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];

  const handleSubmit = () => {
    onDeliveryOpen();
    onClose();
  };
  return (
    <>
      <ConfirmationModal
        onClose={onClose}
        isOpen={isOpen}
        title={<Title />}
        disableFooter
        size="xl"
      >
        <>
          <Preview showHeader={false}>
            <Heading size="md" px="2" py="4">
              {currentQuestion?.questionText}
            </Heading>
            {currentQuestion?.type === "SINGLE_CHOICE" && (
              <SingleChoicePreview
                options={currentQuestion?.options}
                allowOtherAnswer={currentQuestion?.allowOtherAnswer}
              />
            )}
            {currentQuestion?.type === "MULTIPLE_CHOICE" && (
              <MultipleChoicePreview
                options={currentQuestion?.options}
                allowOtherAnswer={currentQuestion?.allowOtherAnswer}
              />
            )}
            <Flex justify="space-between" my="4" mt={12}>
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                colorScheme="purple"
                variant="outline"
              >
                {t("common.previous")}
              </Button>
              <SVButton
                rightIcon={<TbChevronCompactRight />}
                onClick={handleNext}
                disabled={currentStep === questions.length - 1}
              >
                {t("common.next")}
              </SVButton>
            </Flex>
          </Preview>
          <Flex justify="space-between" py="4">
            <Button colorScheme="purple" variant="outline" onClick={onClose}>
              {t("common.close")}
            </Button>
            <SVButton onClick={handleSubmit}>{t("common.publish")}</SVButton>
          </Flex>
        </>
      </ConfirmationModal>
      <DeliveryMethodModal isOpen={isDeliveryOpen} onClose={onDeliveryClose} />
    </>
  );
};

export default SurveyPreview;
