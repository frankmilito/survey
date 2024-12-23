import { useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import SVButton from "../ui/button";
import { useTranslation } from "react-i18next";
import { TbCopy } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store";
import { snackbarActions } from "@/app/data/snackbar/slice";
import SurveySuccess from "./SurveySuccess";
import { surveySelector } from "@/app/data/app/slices/surveySlice";

const IntegrateSurveyModal = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const companyDetails = useAppSelector(surveySelector.getCompany);
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    companyDetails?.credential?.publicKey
  );

  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  useEffect(() => {
    if (hasCopied)
      dispatch(
        snackbarActions.showSnackBar({ text: "Copied", color: "success" })
      );
  }, [hasCopied]);

  useEffect(() => {
    setValue(companyDetails?.credential?.publicKey);
  }, [value]);

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        title={t("survey.integrateSurvey")}
        disableFooter
        size="xl"
        headerSize="2xl"
      >
        <Stack spacing="5">
          <Text color="primary.600">{t("survey.integrateSurveyBlurb")} </Text>
          <Stack>
            <Text fontWeight="medium">{t("survey.publishableApi")} </Text>
            <InputGroup>
              <Input
                readOnly
                cursor="pointer"
                focusBorderColor="gray.200"
                bg="brand.100"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <InputRightElement cursor="pointer" onClick={onCopy}>
                <TbCopy color="#8B5CF6" />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <hr />
          <Text fontWeight="medium" color="red.400">
            {t("survey.note")}
          </Text>
          <Flex justify="space-between" mt="8">
            <Button onClick={onClose} variant="outline" colorScheme="purple">
              {t("common.close")}
            </Button>
            <SVButton
              onClick={() => {
                onSuccessOpen();
                onClose();
              }}
            >
              {t("common.proceed")}
            </SVButton>
          </Flex>
        </Stack>
      </ConfirmationModal>
      <SurveySuccess isOpen={isSuccessOpen} onClose={onSuccessClose} />
    </>
  );
};

export default IntegrateSurveyModal;
