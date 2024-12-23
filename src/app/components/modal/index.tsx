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
import { SVFormControl } from "../ui/forms/FormControl";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { memo, useMemo, useState } from "react";
import SVButton from "../ui/button";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { SVSelect } from "../ui/forms/Select";
import { audienceOptions } from "@/app/data/helpers";
import FilterModal from "./FilterModal";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";

const schema = z.object({
  title: z.string().nonempty("Survey Title is required"),
  description: z.string().nonempty("Survey Description is required"),
  targetAudience: z
    .enum(["All Customers", "Returning Customers", "New Customers", "Segment"])
    .describe(
      "Audience must be either All Customers, Returning Customers,New Customers or Segment"
    ),
});

type SurveyType = z.infer<typeof schema>;
function CreateSurvey({ isOpen, onClose }) {
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

  const [selected, setSelected] = useState(false);
  const toggleSelect = () => setSelected(!selected);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SurveyType>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const formValues = watch();

  const onSubmit = (data) => {
    data.team = teamId;
    dispatch(surveyActions.createSurvey(data));
  };

  const mapFilter = useMemo(() => {
    return Object.values(filters);
  }, [filters]);

  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Stack p={4} align="center">
            <Box w="40" h="2" bg="primary.100" rounded="xl" />
          </Stack>
          <DrawerHeader fontSize="3xl" textAlign="center">
            <Text>{t("survey.getStarted")} </Text>
            <Text fontSize="md" color="primary.500" fontWeight="medium">
              {t("survey.chooseSurvey")}
            </Text>
          </DrawerHeader>
          <DrawerBody my="10">
            {selected ? (
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
                      onClick={toggleSelect}
                    >
                      {t("survey.goBack")}
                    </Button>
                    <SVButton
                      rightIcon={<HiOutlineChevronDoubleRight />}
                      type="submit"
                      isLoading={isLoading}
                    >
                      {t("survey.letBegin")}
                    </SVButton>
                  </Flex>
                </Stack>
              </form>
            ) : (
              <Stack align={"center"} mb="10">
                <Stack w="max-content">
                  <Grid
                    gridTemplateColumns="repeat(2,300px)"
                    gap="8"
                    onClick={toggleSelect}
                  >
                    <GridItem>
                      <Card
                        display="flex"
                        align="start"
                        gap="12px"
                        borderColor="#B7D9FE"
                        variant="outline"
                        bg="#E8F3FF"
                        _hover={{
                          transition: "all .2s ease-in-out",
                          bg: "#B7D9FE",
                        }}
                        p="4"
                        cursor="pointer"
                      >
                        <Image src="/start.svg" boxSize="60px" />
                        <Text fontWeight="bold" fontSize="xl">
                          {t("survey.start")}
                        </Text>
                        <Text color="primary.600" fontStyle="italic">
                          {t("survey.surveyBlurb")}
                        </Text>
                      </Card>
                    </GridItem>
                    <GridItem>
                      <Card
                        cursor="pointer"
                        display="flex"
                        align="start"
                        gap="12px"
                        borderColor="#B1E4B2"
                        variant="outline"
                        bg="#E6F6E6"
                        p="4"
                        _hover={{
                          transition: "all .2s ease-in-out",
                          bg: "#B1E4B2",
                        }}
                      >
                        <Image src="/template.svg" boxSize="60px" />
                        <Text
                          fontWeight="bold"
                          fontSize="xl"
                          color="primary.800"
                        >
                          {t("survey.useTemplate")}
                        </Text>
                        <Text color="primary.600" fontStyle="italic">
                          {t("survey.templateBlurb")}
                        </Text>
                      </Card>
                    </GridItem>
                  </Grid>
                </Stack>
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
        <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
      </Drawer>
    </>
  );
}
export default memo(CreateSurvey);
