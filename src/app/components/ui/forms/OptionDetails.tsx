import {
  Avatar,
  HStack,
  Icon,
  Image,
  Text,
  TextProps,
  VStack,
} from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

export type CustomerListProps = {
  value: string;
  label: string;
  description: string;
  icon?: string;
};

export function CustomerList({
  label,
  description,
  icon,
  size = "sm",
}: CustomerListProps & { size?: "sm" | "md" }) {
  const textOverflow: TextProps = {
    maxWidth: "md",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <HStack gap="4" align="start">
      <Image src={`${icon}.svg`} boxSize={"20px"} />
      <VStack alignItems="start" spacing="0">
        <Text
          color="primary.800"
          fontSize={{ base: "sm", md: "md" }}
          {...textOverflow}
          fontWeight="medium"
        >
          {label}
        </Text>
        <Text color="primary.500" fontSize={size === "sm" ? "xs" : "sm"}>
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}
