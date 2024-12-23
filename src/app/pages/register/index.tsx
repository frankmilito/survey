import {
  Box,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SVFormControl } from "../../components/ui/forms/FormControl";
import { registrationSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CardLayout from "../../components/card/Card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SVButton from "@/app/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions, selectors } from "@/app/data/app/slices/slice";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

type RegisterFormValues = z.infer<typeof registrationSchema>;

function Registration() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectors.isLoading);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [t] = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      password: "",
      agreeToTerms: false,
    },
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    data.purpose = "new_account";
    dispatch(appActions.requestOtp(data));
  };

  const isChecked = watch("agreeToTerms");

  const selectOptions = ["Developer", "Agency"];
  return (
    <CardLayout>
      <VStack spacing={4} align="stretch">
        <Image src={"/logo.svg"} alt="app logo" height="40px" />
        <Box textAlign="center">
          <Heading fontSize={{ sm: "xl", md: "2xl" }}>
            {t("register.createAccount")}
          </Heading>
          <Text mt={2} color="gray.500" fontSize={{ sm: "sm", md: "md" }}>
            {t("register.alreadyHaveAnAccount")}{" "}
            <ChakraLink
              as={Link}
              to="/login"
              color="brand.700"
              fontWeight="medium"
            >
              {t("common.login")}
            </ChakraLink>
          </Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <SVFormControl
                label={t("common.firstName")}
                placeholder="John"
                inputProps={{
                  ...register("firstName"),
                }}
                error={errors.firstName}
              />

              <SVFormControl
                label={t("common.lastName")}
                placeholder="Doe"
                inputProps={{
                  ...register("lastName"),
                }}
                error={errors.lastName}
              />
            </Stack>

            <SVFormControl
              label={t("common.email")}
              placeholder="youremail@gmail.com"
              inputProps={{
                ...register("email"),
              }}
              error={errors.email}
            />
            <SVFormControl
              label={t("common.password")}
              placeholder="Enter password"
              inputProps={{
                ...register("password"),
              }}
              error={errors.password}
              type={passwordVisibility ? "text" : "password"}
              inputRight={passwordVisibility ? VscEye : VscEyeClosed}
              rightToggle={() => setPasswordVisibility(!passwordVisibility)}
            />
            <SVFormControl
              label={t("common.jobType")}
              placeholder="Enter Job title"
              error={errors.jobTitle}
            >
              <Select
                placeholder="Select Job Type"
                {...register("jobTitle")}
                focusBorderColor="purple.400"
              >
                {selectOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </SVFormControl>

            <Checkbox
              isChecked={isChecked}
              {...register("agreeToTerms")}
              colorScheme="purple"
              isRequired
            >
              <Text color="primary.500" fontSize="xs" fontWeight="medium">
                By clicking “Setup my account”, you agree to Safiyo{" "}
                <ChakraLink color="brand.500">Terms of Service</ChakraLink> and{" "}
                <ChakraLink color="brand.500">Privacy policy</ChakraLink>.
              </Text>
            </Checkbox>

            <SVButton
              colorScheme="purple"
              type="submit"
              mt={4}
              width="full"
              isLoading={isLoading}
            >
              Setup my account
            </SVButton>
          </Stack>
        </form>
      </VStack>
    </CardLayout>
  );
}

export default Registration;
