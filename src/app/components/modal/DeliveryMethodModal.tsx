import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmationModal from "./ConfirmationModal";
import { useTranslation } from "react-i18next";
import SVButton from "../ui/button";
import IntegrateSurveyModal from "./IntegrateSurveyModal";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";

type DeliveryOptions = "checkout" | "popup" | "sms";
const DeliveryMethodModal = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { _id: surveyId } = useAppSelector(surveySelector.getCurrentSurvey);
  const isLoading = useAppSelector(surveySelector.isLoading);
  const teamId = useAppSelector((state) => state.app.team);

  const {
    isOpen: isIntegrationOpen,
    onOpen: onIntegrationOpen,
    onClose: onIntegrationClose,
  } = useDisclosure();

  const [selectedMethod, setSelectedMethod] =
    useState<DeliveryOptions>("checkout");

  const handlePublish = () => {
    dispatch(
      surveyActions.publishSurvey({
        id: surveyId,
        team: teamId,
        isActive: true,
        callback: {
          close: onClose,
          open: onIntegrationOpen,
        },
      })
    );
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        disableFooter
        title={t("survey.preferredDelivery")}
        headerSize={"xl"}
      >
        <Box px="6">
          <RadioGroup
            value={selectedMethod}
            onChange={(value: DeliveryOptions) => setSelectedMethod(value)}
          >
            <Stack spacing="4">
              <Radio value="checkout" colorScheme="purple" alignItems="start">
                <Text mt="-1" fontWeight="medium">
                  {t("survey.checkoutSurvey")}{" "}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("survey.checkoutSurveyBlurb")}
                </Text>
              </Radio>
              <hr />

              <Radio value="popup" colorScheme="purple" alignItems="start">
                <Text mt="-1" fontWeight="medium">
                  {t("survey.topUpSurvey")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("survey.topUpSurveyBlurb")}
                </Text>
              </Radio>
              <hr />

              <Radio value="sms" colorScheme="purple" alignItems="start">
                <Text mt="-1" fontWeight="medium">
                  {t("survey.smsSurvey")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {t("survey.smsSurveyBlurb")}
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>

          <Flex justify="space-between" mt="8">
            <Button onClick={onClose} variant="outline" colorScheme="purple">
              {t("common.close")}
            </Button>
            <SVButton onClick={handlePublish} isLoading={isLoading}>
              {t("common.publish")}
            </SVButton>
          </Flex>
        </Box>
      </ConfirmationModal>
      <IntegrateSurveyModal
        isOpen={isIntegrationOpen}
        onClose={onIntegrationClose}
      />
    </>
  );
};

export default DeliveryMethodModal;
