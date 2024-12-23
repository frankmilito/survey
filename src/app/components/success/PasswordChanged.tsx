import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import CardLayout from "../card/Card";

import { useTranslation } from "react-i18next";
import SVButton from "../ui/button";
import { Link } from "react-router-dom";

const PasswordChanged = () => {
  const [t] = useTranslation();
  return (
    <CardLayout containerProps={{ maxW: "3xl" }}>
      <Box bg="white" rounded="lg" p={{ base: 2, md: 4 }} borderRadius="md">
        <VStack spacing={6} align="center">
          <Box p={3} borderRadius="md" color="purple.500">
            <Image
              src={"/password-validation.svg"}
              alt="app logo"
              height="64px"
              width="64px"
            />
          </Box>
          <Heading as="h1" size="lg" fontWeight="bold" textAlign="center">
            {t("login.passwordChanged")}
          </Heading>
          <Text color="primary.600" fontSize="md" textAlign="center">
            {t("login.passwordChangedBlurb")}
            <Text color="primary.600" fontSize="md">
              {t("login.passwordChangedBlurb1")}
            </Text>
          </Text>
          <Link to={"/login"}>
            <SVButton w="xs">{t("register.goToLogin")}</SVButton>
          </Link>
        </VStack>
      </Box>
    </CardLayout>
  );
};

export default PasswordChanged;
