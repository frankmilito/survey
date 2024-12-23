import CardLayout from "@/app/components/card/Card";
import SVButton from "@/app/components/ui/button";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { appActions, selectors } from "@/app/data/app/slices/slice";
import { confirmPasswordSchema } from "@/app/schemas";
import { useAppDispatch, useAppSelector } from "@/store";
import { Center, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { z } from "zod";

type ResetPassword = z.infer<typeof confirmPasswordSchema>;

const NewPassword = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const isLoading = useAppSelector(selectors.isLoading);
  const userPayload = useAppSelector(selectors.selectUserPayload);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  console.log(userPayload);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const onSubmit = (data) => {
    const payload = {
      otp: userPayload.otp,
      email: userPayload.contact,
      password: data.password,
    };
    dispatch(appActions.resetPassword(payload));
  };

  return (
    <CardLayout>
      <Stack justify="center" alignItems="center" mb="5">
        <Image src="/lock-password.svg" boxSize={"64px"} />
        <Text fontSize="2xl" fontWeight="bold" mt="4">
          {t("login.createPassword")}{" "}
        </Text>
        <Text color="primary.600" textAlign="center">
          {t("login.createPasswordBlurb")}{" "}
        </Text>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <SVFormControl
            type={passwordVisibility ? "text" : "password"}
            label={t("login.newPassword")}
            placeholder="Enter Password"
            inputProps={{
              ...register("password"),
            }}
            error={errors.password}
            inputRight={passwordVisibility ? VscEye : VscEyeClosed}
            rightToggle={() => setPasswordVisibility(!passwordVisibility)}
          />
          <SVFormControl
            type={confirmPasswordVisibility ? "text" : "password"}
            label={t("login.confirmPassword")}
            placeholder="Confirm Password"
            inputProps={{
              ...register("confirmPassword"),
            }}
            error={errors.confirmPassword}
            inputRight={confirmPasswordVisibility ? VscEye : VscEyeClosed}
            rightToggle={() =>
              setConfirmPasswordVisibility(!confirmPasswordVisibility)
            }
          />

          <SVButton
            colorScheme="purple"
            type="submit"
            mt={4}
            width="full"
            isLoading={isLoading}
          >
            {t("common.send")}
          </SVButton>
          <Center mt="3">
            <Link to="/login">
              <HStack>
                <Icon color="brand.700" as={FaArrowLeftLong} />
                <Text fontWeight="medium" color="brand.700">
                  {t("login.goBack")}
                </Text>
              </HStack>
            </Link>
          </Center>
        </Stack>
      </form>
    </CardLayout>
  );
};

export default NewPassword;
