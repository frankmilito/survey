import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CheckList from "../ui/forms/CheckList";
import { companyDetailsSchema2 } from "@/app/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SVButton from "../ui/button";
import { Company } from "@/types/User";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions, selectors } from "@/app/data/app/slices/slice";

type ChecklistFormData = Pick<Company, "useCase">;
const options = [
  {
    value: "collectFeedback",
    label: "Collect Customer Feedback",
  },
  {
    value: "productResearch",
    label: "Conduct Product Research",
  },
  {
    value: "postPurchaseExperience",
    label: "Improve Post-Purchase Experience",
  },
  {
    value: "trackLoyalty",
    label: "Track Customer Loyalty (NPS)",
  },
  {
    value: "optimizeUX",
    label: "Optimize Website/User Experience",
  },
  {
    value: "increaseRetention",
    label: "Increase Customer Retention",
  },
];

const Feedback = ({ activeStep }) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.app.company);
  const isLoading = useAppSelector(selectors.isLoading);

  const [t] = useTranslation();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ChecklistFormData>({
    resolver: zodResolver(companyDetailsSchema2),
    defaultValues: {
      useCase: formData.useCase,
    },
  });

  const formValues = watch();
  console.log(formValues);

  const onSubmit = (data: ChecklistFormData) => {
    console.log(data);
    dispatch(appActions.setCompanyFormData(data));
    dispatch(appActions.updateCompany({ ...formData, ...data }));
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HStack>
          <Image src="/stack.svg" boxSize={{ base: "20px", md: "30px" }} />
          <Heading
            as="h1"
            fontSize={{ sm: "lg", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
            color="primary.700"
          >
            {t("onboarding.platform")}
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
      <Stack>
        <Text fontWeight="medium" fontSize="lg" my="4">
          {t("onboarding.intentOfUse")}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckList
            control={control}
            error={errors.useCase}
            options={options}
            name="useCase"
          />
          <SVButton
            colorScheme="purple"
            type="submit"
            mt={12}
            width="full"
            h={14}
            isLoading={isLoading}
          >
            {t("common.complete")}
          </SVButton>
        </form>
      </Stack>
    </Box>
  );
};

export default Feedback;
