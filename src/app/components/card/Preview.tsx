import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const Preview = ({
  showHeader = true,
  children,
}: {
  children: ReactNode;
  showHeader?: boolean;
}) => {
  const [t] = useTranslation();
  return (
    <Card borderRadius="xl" p="2" variant="outline" bg="primary.50">
      <Box p="1" alignItems="center">
        {showHeader && (
          <CardHeader px="0">
            <Flex align={{ sm: "center" }}>
              <Image src="/eye.svg" mr="2" />
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color="primary.800"
                fontWeight="medium"
              >
                {t("questions.previewOptions")}
              </Text>
            </Flex>
          </CardHeader>
        )}
        <CardBody p="0" borderRadius="xl">
          <Box
            bg="white"
            rounded="lg"
            p={{ base: 2, sm: 0, md: 4 }}
            borderRadius="md"
          >
            {children}
          </Box>
        </CardBody>
      </Box>
    </Card>
  );
};

export default Preview;
