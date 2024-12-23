import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  Card,
  Image,
  Text,
  Grid,
  GridItem,
  Flex,
  Textarea,
  Button,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";
import { SVFormControl } from "../../ui/forms/FormControl";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { memo, useEffect, useMemo, useState } from "react";
import SVButton from "../../ui/button";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { SVSelect } from "../../ui/forms/Select";
import { audienceOptions } from "@/app/data/helpers";
import FilterModal from "../../modal/FilterModal";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import { Survey } from "@/types/survey";

const schema = z.object({
  title: z.string().nonempty("Survey Title is required"),
  description: z.string().nonempty("Survey Description is required"),
  targetAudience: z
    .enum(["All Customers", "Returning Customers", "New Customers", "Segment"])
    .describe(
      "Audience must be either All Customers, Returning Customers,New Customers or Segment"
    ),
});

export type SurveyType = z.infer<typeof schema>;

type EditSurveyProps = {
  onClose: VoidFunction;
  isOpen: boolean;
  survey: Survey;
};
function EditSurvey({ isOpen, onClose, survey }) {
  const isLoading = useAppSelector(surveySelector.isLoading);
  const teamId = useAppSelector((state) => state.app.team);
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const filters = useAppSelector(surveySelector.getFilters);

  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<SurveyType>({
    defaultValues: {
      description: survey.description,
      title: survey.title,
      targetAudience: survey.targetAudience,
    },
    resolver: zodResolver(schema),
  });

  const formValues = watch();

  const onSubmit = (data) => {
    data.team = teamId;
    data.id = survey._id;
    dispatch(surveyActions.editSurvey(data));
  };

  const mapFilter = useMemo(() => {
    return Object.values(filters);
  }, [filters]);

  useEffect(() => {
    if (survey) {
      reset({
        description: survey.description,
        title: survey.title,
        targetAudience: survey.targetAudience,
      });
    }
  }, [survey, reset]);

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Stack p={4} align="center">
            <Box w="40" h="2" bg="primary.100" rounded="xl" />
          </Stack>
          <DrawerHeader fontSize="3xl" textAlign="center">
            <Text>{t("survey.editSurvey")} </Text>
          </DrawerHeader>
          <DrawerBody my="10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack w="lg" margin="auto">
                <SVFormControl
                  label={t("survey.title")}
                  placeholder="E.g Customer Discovery Survey"
                  inputProps={{
                    ...register("title"),
                  }}
                  error={errors.title}
                  mb="4"
                />
                <SVFormControl
                  label={t("survey.selectAudience")}
                  error={errors.targetAudience}
                  m={4}
                >
                  <SVSelect
                    customers={audienceOptions}
                    onSelect={(select) => {
                      setValue(
                        "targetAudience",
                        select?.value as SurveyType["targetAudience"]
                      );
                      trigger("targetAudience");
                    }}
                  />
                </SVFormControl>
                {formValues.targetAudience === "Segment" && (
                  <Grid
                    templateColumns={{
                      sm: "repeat(1, 1fr)",
                      md: "repeat(5, 1fr)",
                    }}
                    alignItems={"start"}
                  >
                    <GridItem colSpan={4}>
                      {!mapFilter.includes("") ? (
                        mapFilter.map((item) => (
                          <Tag
                            variant="solid"
                            bg="#E8F3FF"
                            color="#115DB4"
                            m={2}
                          >
                            {item}
                          </Tag>
                        ))
                      ) : (
                        <Text color="primary.500">
                          {t("filters.noFilters")}
                        </Text>
                      )}
                    </GridItem>
                    <GridItem
                      colSpan={1}
                      color="brand.700"
                      cursor="pointer"
                      onClick={onFilterOpen}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      m={2}
                    >
                      <Image src="/filter.svg" boxSize="15px" mr="1" />
                      <Text fontWeight="medium">{t("filters.filters")}</Text>
                    </GridItem>
                  </Grid>
                )}
                <SVFormControl
                  label={t("survey.description")}
                  placeholder="E.g Gathers insights on how customers discover the brand."
                  error={errors.description}
                >
                  <Textarea
                    {...register("description")}
                    focusBorderColor="brand.500"
                    rows={8}
                    placeholder="E.g Gathers insights on how customers discover the brand."
                    _placeholder={{ color: "primary.200" }}
                  />
                </SVFormControl>
                <Flex justify="space-between" mt={[2, 4, 8]}>
                  <Button
                    leftIcon={<HiOutlineChevronDoubleLeft />}
                    variant="ghost"
                    color="primary.500"
                    onClick={onClose}
                  >
                    {t("survey.goBack")}
                  </Button>
                  <SVButton
                    rightIcon={<HiOutlineChevronDoubleRight />}
                    type="submit"
                    isLoading={isLoading}
                  >
                    {t("survey.saveChanges")}
                  </SVButton>
                </Flex>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
        <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
      </Drawer>
    </>
  );
}
export default memo(EditSurvey);
