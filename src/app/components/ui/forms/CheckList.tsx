import {
  Checkbox,
  CheckboxGroup,
  VStack,
  Box,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Checklist = {
  control: any;
  options: any;
  error?: any;
  name: string;
  otherValue?: string;
};
const CheckList = ({
  control,
  options,
  error,
  name,
  otherValue,
}: Checklist) => {
  const [t] = useTranslation();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CheckboxGroup {...field} colorScheme="purple">
            <VStack alignItems="start" spacing={4}>
              {options.map((option) => (
                <Checkbox key={option.value} value={option.value} spacing={4}>
                  <Text fontWeight="medium">{option.label}</Text>
                  <Text fontSize="sm" color="primary.600">
                    {option?.description}
                  </Text>
                </Checkbox>
              ))}
              {otherValue && (
                <>
                  <Checkbox checked={true} value="">
                    <Text fontWeight="medium" ml={2}>
                      {t("common.others")}
                    </Text>
                  </Checkbox>
                  <Flex align={"end"}>
                    <Text>{t("questions.specify")}</Text>
                    <Image src="/underline.svg" height={2} width={40} />
                  </Flex>
                </>
              )}
            </VStack>
          </CheckboxGroup>
        )}
      />
      {error && (
        <Text color="red.500" mt={2}>
          {error.message}
        </Text>
      )}
    </>
  );
};

export default CheckList;
