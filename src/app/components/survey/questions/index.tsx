import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  Divider,
  Flex,
  Select,
  VStack,
} from "@chakra-ui/react";
import { SVFormControl } from "../../ui/forms/FormControl";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { SVSelect } from "../../ui/forms/Select";
import SingleChoice from "./options/SingleChoice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiChoice from "./options/MultiChoice";
import InputOption from "./options/InputOption";
import InputTextAreaOption from "./options/InputTextAreaOption";
import PromoterOption from "./options/PromoterOption";
import MoodScaleOption from "./options/MoodScaleOption";
import { questionOptions } from "@/app/data/helpers";
import { questionSchema } from "@/app/schemas";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import SVButton from "../../ui/button";
import { useEffect } from "react";

export type Question = z.infer<typeof questionSchema>;

export function Questions({ onClose, isOpen }) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(surveySelector.isLoading);
  const teamId = useAppSelector((state) => state.app.team);
  const survey = useAppSelector(surveySelector.getCurrentSurvey);
  const [t] = useTranslation();

  const methods = useForm<Question>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: "SINGLE_CHOICE",
      questionText: "",
      options: [],
      required: false,
      allowOtherAnswer: false,
    },
  });

  const formValues = methods.watch();

  let content;

  switch (formValues.type) {
    case "SINGLE_CHOICE":
      content = <SingleChoice />;
      break;

    case "MULTIPLE_CHOICE":
      content = <MultiChoice />;
      break;
    case "TEXTINPUT_CHOICE":
      content = <InputOption />;
      break;

    case "TEXTAREA_CHOICE":
      content = <InputTextAreaOption />;
      break;

    case "MOOD_CHOICE":
      content = <MoodScaleOption />;
      break;
    case "PROMOTER_CHOICE":
      content = <PromoterOption />;

      break;

    default:
      break;
  }

  const onSubmit = (data) => {
    data.id = survey._id;
    data.team = teamId;
    dispatch(
      surveyActions.addSurveyQuestion({
        callback: onClose,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (isOpen) {
      methods.reset();
    }
  }, [isOpen]);
  return (
    <>
      <Drawer
        placement={"right"}
        onClose={onClose}
        isOpen={isOpen}
        isFullHeight={false}
        size="lg"
        closeOnEsc
        closeOnOverlayClick={true}
      >
        <DrawerOverlay />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DrawerContent>
              <DrawerHeader my={4}>
                Question {survey.questions.length + 1}
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={6} align="stretch">
                  <SVFormControl
                    label={t("questions.question")}
                    inputProps={{
                      ...methods.register("questionText"),
                    }}
                    error={methods.formState.errors.questionText}
                  />

                  <Flex gap={4}>
                    <SVFormControl
                      label={t("questions.questionType")}
                      error={methods.formState.errors.type}
                      m={4}
                    >
                      <SVSelect
                        customers={questionOptions}
                        onSelect={(select) => {
                          methods.setValue(
                            "type",
                            select?.value as Question["type"]
                          );
                          methods.trigger("type");
                          methods.clearErrors("questionText");
                        }}
                      />
                    </SVFormControl>
                    <SVFormControl
                      flex={1}
                      error={methods.formState.errors.required}
                      label={t("questions.makeOptional")}
                      m={4}
                    >
                      <Select
                        {...methods.register("rightLabel", {
                          setValueAs: (value) => value === "Yes",
                        })}
                        focusBorderColor="purple.400"
                      >
                        {["Yes", "No"].map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                    </SVFormControl>
                  </Flex>

                  {formValues.type === "PROMOTER_CHOICE" && (
                    <Flex gap={4}>
                      <SVFormControl
                        flex={1}
                        label={t("questions.leftLabel")}
                        m={4}
                      >
                        <Select
                          {...methods.register("leftLabel")}
                          focusBorderColor="purple.400"
                        >
                          {["Yes", "No"].map((item) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                        </Select>
                      </SVFormControl>
                      <SVFormControl
                        flex={1}
                        label={t("questions.rightLabel")}
                        m={4}
                      >
                        <Select
                          {...methods.register("rightLabel")}
                          focusBorderColor="purple.400"
                        >
                          {["Yes", "No"].map((item) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                        </Select>
                      </SVFormControl>
                    </Flex>
                  )}

                  <Divider />
                  {content}
                </VStack>

                <Flex mt={8} justify="space-between">
                  <Button
                    variant="outline"
                    colorScheme="purple"
                    onClick={onClose}
                  >
                    {t("common.cancel")}
                  </Button>
                  <SVButton isLoading={isLoading} type="submit">
                    {t("common.save")}
                  </SVButton>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </form>
        </FormProvider>
      </Drawer>
    </>
  );
}
