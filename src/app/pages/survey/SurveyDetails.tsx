import DraggableList from "@/app/components/drag-drop";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import { EditQuestion } from "@/app/components/survey/edit/EditQuestion";
import EditSurvey from "@/app/components/survey/edit/EditSurvey";
import { Questions } from "@/app/components/survey/questions";
import Wrapper from "@/app/components/wrapper";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import { formatDate, formatType } from "@/app/data/helpers/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbDots } from "react-icons/tb";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const survey = useAppSelector(surveySelector.getCurrentSurvey);
  const isLoading = useAppSelector(surveySelector.isLoading);
  const [options, setOptions] = useState(survey?.questions);
  const {
    isOpen: isEditSurveyOpen,
    onOpen: onEditSurveyOpen,
    onClose: onEditSurveyClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditQuestionOpen,
    onOpen: onEditQuestionOpn,
    onClose: onEditQuestionClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedIdx] = useState();

  useEffect(() => {
    dispatch(surveyActions.getSurvey(id));
  }, [id]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedOptions = Array.from(options);
    const [removed] = reorderedOptions.splice(source.index, 1);
    reorderedOptions.splice(destination.index, 0, removed);
    setOptions(reorderedOptions);
    const ids = reorderedOptions.map((option) => option._id);

    const payload = {
      id: survey?._id,
      team: survey?.team,
      questionsOrder: ids,
    };
    dispatch(surveyActions.reorderSurveyQuestion(payload));
  };

  const handleDelete = () => {
    const updatedOptions = options.filter((item, i) => item._id !== selectedId);
    setOptions(updatedOptions);

    const payload = {
      surveyId: survey?._id,
      team: survey?.team,
      questionId: selectedId,
    };
    dispatch(surveyActions.removeSurveyQuestion(payload));
  };

  const selectedQuestion = survey.questions.find(
    (question) => question._id === selectedId
  );

  return (
    <Wrapper>
      <Flex align="center" justify="center" mt="8">
        <Box w="3xl">
          {isLoading ? (
            <Stack w="2xl">
              <Skeleton height="20px" />
              <Skeleton height="50px" />
              <Skeleton height="500px" />
            </Stack>
          ) : (
            <Stack justify={"center"}>
              <Flex justify="space-between" my="4">
                <Stack>
                  <Heading fontWeight="medium">{survey.title}</Heading>
                  <Text color="primary.500">{survey.description}</Text>
                  <Text fontWeight="medium">
                    {t("survey.lastUpdated")} {formatDate(survey?.updatedAt)}
                  </Text>
                </Stack>
                <Flex>
                  <Flex
                    align="center"
                    color="brand.700"
                    fontSize="sm"
                    onClick={onEditSurveyOpen}
                  >
                    <Image src="/edit.svg" mr="1" />
                    <Link fontSize="md" fontWeight={"medium"} mr="2">
                      {t("common.edit")}
                    </Link>
                  </Flex>
                  <Flex align="center">
                    <Icon as={TbDots} mr={1} size="xl" />
                  </Flex>
                </Flex>
              </Flex>
              <Card bg="#f4f4f4" p="4" variant="outline" rounded="lg">
                <Box bg="white" rounded="md" p="4">
                  <Tabs>
                    <TabList>
                      <Tab>{t("survey.overview")}</Tab>
                      <Tab>{t("survey.responses")}</Tab>
                      <Tab>
                        {t("survey.questions")}{" "}
                        <Tag ml="1">{survey?.questions?.length}</Tag>
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Grid
                          templateColumns={{
                            sm: "repeat(1, 1fr)",
                            md: "repeat(3, 1fr)",
                          }}
                          gap={6}
                        >
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/response.svg`}
                                bgSize="40px"
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                {t("survey.totalResponse")}
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/percent.svg`}
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                {t("survey.completionRate")}
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                          <Card
                            variant="outline"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            // p={4}
                            borderColor="primary.100"
                          >
                            <GridItem w="100%" p="5" gap={100}>
                              <Image
                                src={`/timer.svg`}
                                bg="#B7D9FE"
                                p="3"
                                rounded="lg"
                              />
                              <Text
                                color="primary.600"
                                fontWeight="medium"
                                my="2"
                              >
                                {t("survey.averageResponseTime")}
                              </Text>
                              <Text fontWeight="semibold" fontSize={"xl"}>
                                N/A
                              </Text>
                            </GridItem>
                          </Card>
                        </Grid>
                        {survey.questions.map((question, index) => (
                          <>
                            <Flex justify="space-between" align="center">
                              <HStack py="5" key={question._id}>
                                <Tag bg="#1883FD" color="white" rounded="full">
                                  {index + 1}
                                </Tag>
                                <Text>{question.questionText}</Text>
                              </HStack>
                              <Link>
                                <HStack>
                                  <Image src="/chart.svg" />
                                  <Text fontWeight={"medium"} color="brand.700">
                                    View Analytics
                                  </Text>
                                </HStack>
                              </Link>
                            </Flex>
                            <hr />
                          </>
                        ))}
                      </TabPanel>
                      <TabPanel>
                        <p>Responses!</p>
                      </TabPanel>
                      <TabPanel>
                        {/* {survey.questions.map((question) => (
                          <>
                            <Flex justify="space-between" align="center">
                              <HStack py="5" key={question._id}>
                                <Tag bg="#1883FD" color="white" rounded="full">
                                  {1}
                                </Tag>
                                <Text>{question.questionText}</Text>
                              </HStack>
                              <Link>
                                <HStack>
                                  <Image src="/chart.svg" />
                                  <Text fontWeight={"medium"} color="brand.700">
                                    View Analytics
                                  </Text>
                                </HStack>
                              </Link>
                            </Flex>
                            <hr />
                          </>
                        ))} */}
                        <Button
                          w="full"
                          my="2"
                          variant={"ghost"}
                          border="1px"
                          borderStyle="dashed"
                          color="brand.500"
                          onClick={onOpen}
                        >
                          {t("questions.addNewQuestion")}
                        </Button>
                        <DraggableList
                          border="none"
                          items={options}
                          onDragEnd={onDragEnd}
                          renderItem={(item, index) => (
                            <HStack
                              w="full"
                              display="flex"
                              justify="space-between"
                              align="start"
                            >
                              <HStack gap="20px" align="center">
                                <Image
                                  src="/drag-drop.svg"
                                  boxSize="24px"
                                  cursor="move"
                                />
                                <Tag bg="#1883FD" color="white" rounded="full">
                                  {index + 1}
                                </Tag>

                                <Stack align="start">
                                  <Text color="primary.800" fontWeight="medium">
                                    {item.questionText}
                                  </Text>
                                  <Text color="primary.500">
                                    {formatType(item.type)}
                                  </Text>
                                </Stack>
                              </HStack>
                              <HStack>
                                <Image
                                  src="/pencil.svg"
                                  boxSize="24px"
                                  cursor="pointer"
                                  onClick={() => {
                                    setSelectedIdx(item._id);
                                    onEditQuestionOpn();
                                  }}
                                />
                                <Image
                                  src="/delete.svg"
                                  boxSize="24px"
                                  cursor="pointer"
                                  onClick={() => {
                                    onDeleteOpen();
                                    setSelectedIdx(item._id);
                                  }}
                                />
                              </HStack>
                            </HStack>
                          )}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </Card>
            </Stack>
          )}
        </Box>
      </Flex>
      <EditSurvey
        isOpen={isEditSurveyOpen}
        onClose={onEditSurveyClose}
        survey={survey}
      />
      <EditQuestion
        isOpen={isEditQuestionOpen}
        onClose={onEditQuestionClose}
        question={selectedQuestion}
        surveyId={survey._id}
      />
      <Questions isOpen={isOpen} onClose={onClose} />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        confirmHandler={handleDelete}
        title={t("questions.confirmDelete")}
        bodyText={t("questions.confirmDeleteBlurb")}
      />
    </Wrapper>
  );
};

export default SurveyDetails;
