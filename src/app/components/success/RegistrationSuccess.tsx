import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import CardLayout from "../card/Card";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";

import { useSearchParams } from "react-router-dom";
import { appActions, selectors } from "@/app/data/app/slices/slice";

export type Purpose = "new_account" | "login" | "reset_password" | null;
const RegistrationSuccess = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();
  const userPayload = useAppSelector(selectors.selectUserPayload);
  const isLoading = useAppSelector(selectors.isLoading);

  const ref = searchParams.get("ref") as Purpose | null;

  const handleComplete = (value: string) => {
    switch (ref) {
      case "new_account":
        dispatch(
          appActions.signup({
            ...userPayload,
            otp: value,
            email: userPayload.contact,
          })
        );
        break;
      case "login":
        dispatch(
          appActions.login({
            otp: value,
            email: userPayload.contact,
            password: userPayload.password,
          })
        );
        break;
      case "reset_password":
        dispatch(
          appActions.verifyOTP({
            purpose: "reset_password",
            otp: value,
            email: userPayload.contact,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleChangeEmail = () => {
    switch (ref) {
      case "new_account":
        return "/register";

      case "reset_password":
        return "/reset-password";

      default:
        return "/login";
    }
  };

  const href = handleChangeEmail();
  return (
    <CardLayout>
      <Box bg="white" rounded="lg" p={{ base: 6, md: 12 }} borderRadius="md">
        <VStack spacing={6} align="center">
          <Box p={3} borderRadius="md" color="purple.500">
            <Image
              src={"/mail-open.svg"}
              alt="app logo"
              height="64px"
              width="64px"
            />
          </Box>
          <Heading
            as="h1"
            fontSize={{ sm: "xl", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
          >
            {t("register.verifyEmail")}
          </Heading>

          <Text color="primary.600" fontSize="md" textAlign="center">
            {t("register.otpSent")}
            <Text as="span" fontWeight="medium" color="primary.800">
              {userPayload?.contact}{" "}
            </Text>
            <Link
              color="brand.700"
              textDecoration="underline"
              fontWeight="medium"
              href={href}
            >
              {t("common.change")}
            </Link>
          </Text>

          <Text fontSize="md" textAlign="center" color="primary.500">
            {t("register.checkEmail")}
          </Text>
          {isLoading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : (
            <HStack>
              <PinInput
                colorScheme="red"
                onComplete={handleComplete}
                placeholder="O"
                focusBorderColor="purple"
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <span>-</span>
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          )}
          <Text color="primary.600" fontSize="sm" textAlign="center">
            {t("register.notRecieved")}{" "}
            <Link
              color="brand.700"
              textDecoration="underline"
              fontWeight="medium"
            >
              {t("common.resendEmail")}
            </Link>
          </Text>
        </VStack>
      </Box>
    </CardLayout>
  );
};

export default RegistrationSuccess;
