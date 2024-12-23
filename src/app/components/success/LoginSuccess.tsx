import { Box, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import CardLayout from "../card/Card";

import { useTranslation } from "react-i18next";

const LoginSuccess = ({ email = "franktest@gmail.com" }) => {
  const [t] = useTranslation();
  return (
    <CardLayout containerProps={{ maxW: "3xl" }}>
      <Box bg="white" rounded="lg" p={{ base: 2, md: 4 }} borderRadius="md">
        <VStack spacing={6} align="center">
          <Box p={3} borderRadius="md" color="purple.500">
            <Image
              src={"/mail-open.svg"}
              alt="app logo"
              height="64px"
              width="64px"
            />
          </Box>
          <Heading as="h1" size="lg" fontWeight="bold" textAlign="center">
            {t("login.checkInbox")}
          </Heading>
          <Text color="primary.600" fontSize="md" textAlign="center">
            {t("login.loginSent")}
            <Text as="span" fontWeight="medium" color="primary.800">
              {email}
            </Text>{" "}
            <Text color="primary.600" fontSize="md">
              {t("login.clickToContinue")}
            </Text>
          </Text>

          <Text fontSize="lg" textAlign="center">
            {t("login.loginBlurb")}
          </Text>

          <Text color="primary.600" fontSize="sm" textAlign="center">
            {t("login.notRecieved")}
            <Link
              color="brand.700"
              textDecoration="underline"
              fontWeight="medium"
            >
              {t("common.resendLink")}
            </Link>
          </Text>
        </VStack>
      </Box>
    </CardLayout>
  );
};

export default LoginSuccess;
