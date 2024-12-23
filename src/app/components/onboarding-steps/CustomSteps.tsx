import React from "react";
import { Box, Flex, Text, Heading, Divider } from "@chakra-ui/react";

const CustomStepper = ({ currentStep = 1 }) => {
  return (
    <Box mb={8}>
      <Flex>
        <Box
          w={20}
          h={2}
          bg={currentStep >= 1 ? "brand.700" : "gray.300"}
          color={currentStep >= 1 ? "white" : "gray.500"}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={2}
        />

        <Box
          w={20}
          h={2}
          bg={currentStep >= 2 ? "brand.700" : "gray.300"}
          color={currentStep >= 2 ? "white" : "gray.500"}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml={4}
        />
      </Flex>
    </Box>
  );
};

export default CustomStepper;
