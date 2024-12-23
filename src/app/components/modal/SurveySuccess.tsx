import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SVButton from "../ui/button";
import { router } from "@/app/routes";
import { useAppSelector } from "@/store";
import { surveySelector } from "@/app/data/app/slices/surveySlice";
import { Link } from "react-router-dom";

const SurveySuccess = ({ isOpen, onClose }) => {
  const [t] = useTranslation();
  const { _id } = useAppSelector(surveySelector.getCurrentSurvey);
  return (
    <ConfirmationModal isOpen={isOpen} onClose={onClose} disableFooter>
      <Stack spacing={4}>
        <Image src="/success.svg" boxSize="56px" m="auto" />
        <Text fontWeight="bold" textAlign="center" fontSize="lg">
          {t("survey.surveyCheckout")}{" "}
        </Text>
        <hr />
        <Flex justify="space-between" mt="4" w="full">
          <Button onClick={onClose} variant="outline" colorScheme="purple">
            {t("common.close")}
          </Button>
          <Link to={`/survey/${_id}`}>
            <SVButton>{t("survey.surveyDetails")}</SVButton>
          </Link>
        </Flex>
      </Stack>
    </ConfirmationModal>
  );
};

export default SurveySuccess;
