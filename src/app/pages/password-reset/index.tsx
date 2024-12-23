import CardLayout from "@/app/components/card/Card";
import SVButton from "@/app/components/ui/button";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import { appActions, selectors } from "@/app/data/app/slices/slice";
import { resetPasswordSchema } from "@/app/schemas";
import { useAppDispatch, useAppSelector } from "@/store";
import { Center, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { z } from "zod";

type ResetPassword = z.infer<typeof resetPasswordSchema>;

const PasswordReset = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const isLoading = useAppSelector(selectors.isLoading);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    data.purpose = "reset_password";
    dispatch(appActions.requestOtp(data));
  };
  return (
    <CardLayout>
      <Stack justify="center" alignItems="center" mb="5">
        <Image src="/forgot-password.svg" boxSize={"64px"} />
        <Text fontSize="2xl" fontWeight="bold" mt="4">
          {t("login.resetPassword")}{" "}
        </Text>
        <Text color="primary.600" textAlign="center">
          {t("login.resetPasswordBlurb")}{" "}
        </Text>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <SVFormControl
            label={t("common.email")}
            placeholder="youremail@gmail.com"
            inputProps={{
              ...register("email"),
            }}
            error={errors.email}
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

export default PasswordReset;
