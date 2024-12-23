import { FilterFormValues } from "@/app/components/modal/FilterModal";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { Select, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Demographics = () => {
  const { register } = useFormContext<FilterFormValues>();
  const [t] = useTranslation();
  return (
    <VStack>
      <SVFormControl label={t("filters.ageRange")}>
        <Select {...register("ageRange")} focusBorderColor="purple.400">
          <option value="18-24">18-24 years</option>
          <option value="25-34">25-34 years</option>
          <option value="35-44">35-44 years</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.gender")}>
        <Select {...register("gender")} focusBorderColor="purple.400">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.country")}>
        <Select {...register("country")} focusBorderColor="purple.400">
          <option value="Nigeria">Nigeria</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.language")}>
        <Select {...register("language")} focusBorderColor="purple.400">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </Select>
      </SVFormControl>
    </VStack>
  );
};

export default Demographics;
