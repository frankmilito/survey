import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SVFormControl } from "../ui/forms/FormControl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailsSchema1 } from "@/app/schemas";
import SVButton from "../ui/button";
import { Company } from "@/types/User";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions, selectors } from "@/app/data/app/slices/slice";

const CompanyDetails = ({ setActiveStep, activeStep }) => {
  const formData = useAppSelector((state) => state.app.company);

  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectors.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Company, "useCase">>({
    resolver: zodResolver(companyDetailsSchema1),
    defaultValues: formData,
  });

  const handleNextStep = (data: Omit<Company, "useCase">) => {
    dispatch(appActions.setCompanyFormData(data));
    setActiveStep();
  };
  const options = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HStack>
          <Image src="/office.svg" boxSize={{ base: "20px", md: "30px" }} />
          <Heading
            as="h1"
            fontSize={{ sm: "lg", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
            color="primary.700"
          >
            {t("onboarding.headerTitle")}
          </Heading>
        </HStack>

        <Flex alignItems={"end"} display={{ base: "none", md: "inline-flex" }}>
          <Text fontSize="2xl" fontWeight="bold">
            {activeStep}
          </Text>
          <Text fontWeight="medium" color="primay.600">
            /2
          </Text>
        </Flex>
      </Box>
      <Divider my={{ base: 6, md: 12 }} />

      <form onSubmit={handleSubmit(handleNextStep)}>
        <Stack spacing={8}>
          <SVFormControl
            label={t("onboarding.companyName")}
            placeholder={t("onboarding.enterName")}
            inputProps={{
              ...register("name"),
            }}
            error={errors.name}
          />
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <SVFormControl
              label={t("onboarding.selectIndustry")}
              error={errors.industry}
            >
              <Select
                placeholder={t("onboarding.selectIndustry")}
                {...register("industry")}
                focusBorderColor="purple.400"
              >
                <option value={"Tech"}>Tech</option>
                <option value={"Health"}>Health</option>
              </Select>
            </SVFormControl>
            <SVFormControl
              label={t("onboarding.companySize")}
              error={errors.companySize}
            >
              <Select
                placeholder={t("onboarding.companySize")}
                {...register("companySize")}
                focusBorderColor="purple.400"
              >
                {options.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </SVFormControl>
          </Stack>
          <SVFormControl
            label={t("onboarding.selectCountry")}
            error={errors.country}
          >
            <Select
              placeholder={t("onboarding.selectCountry")}
              {...register("country")}
              focusBorderColor="purple.400"
            >
              <option value={"Nigeria"}>Nigeria</option>
              <option value={"uk"}>UK</option>
              <option value={"canada"}>Canada</option>
            </Select>
          </SVFormControl>

          <SVButton
            colorScheme="purple"
            type="submit"
            mt={4}
            width="full"
            h={14}
            isLoading={isLoading}
          >
            {t("common.next")}
          </SVButton>
        </Stack>
      </form>
    </>
  );
};

export default CompanyDetails;
