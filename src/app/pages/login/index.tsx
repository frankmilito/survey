import {
  Box,
  Checkbox,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SVFormControl } from "../../components/ui/forms/FormControl";
import { loginSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CardLayout from "../../components/card/Card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SVButton from "@/app/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { appActions, selectors } from "@/app/data/app/slices/slice";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectors.isLoading);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    data.purpose = "login";
    dispatch(
      appActions.login({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <CardLayout>
      <VStack spacing={4} align="stretch">
        <Image src={"/logo.svg"} alt="app logo" height="40px" />
        <Box textAlign="center">
          <Heading fontSize={{ sm: "xl", md: "2xl" }}>
            {t("login.welcome")}
          </Heading>
          <Text mt={2} color="gray.500" fontSize={{ sm: "sm", md: "md" }}>
            {t("login.dontHaveAnAccount")}{" "}
            <ChakraLink
              as={Link}
              color="brand.700"
              to="/register"
              fontWeight="medium"
            >
              {t("register.signUp")}
            </ChakraLink>
          </Text>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <SVFormControl
              label={t("common.email")}
              placeholder="youremail@gmail.com"
              inputProps={{
                ...register("email"),
              }}
              error={errors.email}
              isRequired
            />
            <SVFormControl
              type={passwordVisibility ? "text" : "password"}
              label={t("common.password")}
              placeholder="Enter password"
              inputProps={{
                ...register("password"),
              }}
              inputRight={passwordVisibility ? VscEye : VscEyeClosed}
              rightToggle={() => setPasswordVisibility(!passwordVisibility)}
              error={errors.password}
              isRequired
            />
            <Flex justify="space-between">
              <Checkbox {...register("rememberMe")} colorScheme="purple">
                <Text color="primary.500" fontSize="xs" fontWeight="medium">
                  {t("login.rememberMe")}
                </Text>
              </Checkbox>
              <Link to="/reset-password">
                <Text fontWeight="medium" color="brand.700" fontSize="sm">
                  {t("login.forgotPassword")}{" "}
                </Text>
              </Link>
            </Flex>
            <SVButton
              colorScheme="purple"
              type="submit"
              mt={4}
              width="full"
              isLoading={isLoading}
            >
              {t("login.sendLoginLink")}
            </SVButton>
          </Stack>
        </form>
      </VStack>
    </CardLayout>
  );
}

export default Login;
