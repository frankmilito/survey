import { FilterFormValues } from "@/app/components/modal/FilterModal";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { Select, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const EngagementLevels = () => {
  const { register } = useFormContext<FilterFormValues>();
  const [t] = useTranslation();
  return (
    <VStack spacing={4}>
      <SVFormControl label={t("filters.emailEngagement")}>
        <Select {...register("emailEngagement")} focusBorderColor="purple.400">
          <option value="mid">Somewhat engaged</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.surveyResponse")}>
        <Select {...register("responseHistory")} focusBorderColor="purple.400">
          <option value="frequent">Frequent Responders</option>
        </Select>
      </SVFormControl>
    </VStack>
  );
};

export default EngagementLevels;
