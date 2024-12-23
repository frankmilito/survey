import CheckList from "@/app/components/ui/forms/CheckList";
import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const SingleChoicePreview = ({ options, allowOtherAnswer }) => {
  const [t] = useTranslation();

  return (
    <RadioGroup colorScheme="purple">
      <Stack>
        {options.map((item) => (
          <Radio color="primary.500" value={item} key={item}>
            <Text fontWeight="medium"> {item}</Text>
          </Radio>
        ))}
        {allowOtherAnswer && (
          <>
            <Radio value="others">{t("common.others")}</Radio>
            <Flex align={"end"}>
              <Text>{t("questions.specify")}</Text>
              <Image src="/underline.svg" height={2} width={40} />
            </Flex>
          </>
        )}
      </Stack>
    </RadioGroup>
  );
};

export const MultipleChoicePreview = ({ options, allowOtherAnswer }) => {
  const [t] = useTranslation();
  return (
    <CheckboxGroup colorScheme="purple">
      <VStack alignItems="start" spacing={4}>
        {options.map((option) => (
          <Checkbox key={option} value={option} spacing={4}>
            <Text fontWeight="medium">{option}</Text>
          </Checkbox>
        ))}
        {allowOtherAnswer && (
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
  );
};
