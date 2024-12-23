import Wrapper from "@/app/components/wrapper";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { z } from "zod";
import SVButton from "@/app/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Questions } from "@/app/components/survey/questions";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import DraggableList from "@/app/components/drag-drop";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import SurveyPreview from "@/app/components/survey/questions/preview/Preview";
import DeliveryMethodModal from "@/app/components/modal/DeliveryMethodModal";
import IntegrateSurveyModal from "@/app/components/modal/IntegrateSurveyModal";
import { formatType } from "@/app/data/helpers/utils";

const schema = z.object({
  targetAudience: z.string().nonempty({
    message: "Target Audience is Required",
  }),
});

type FormType = z.infer<typeof schema>;

const Survey = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const currentSurvey = useAppSelector(surveySelector.getCurrentSurvey);
  const [options, setOptions] = useState(currentSurvey?.questions);
  const [selectedId, setSelectedIdx] = useState();

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedOptions = Array.from(options);
    const [removed] = reorderedOptions.splice(source.index, 1);
    reorderedOptions.splice(destination.index, 0, removed);
    setOptions(reorderedOptions);
    const ids = reorderedOptions.map((option) => option._id);

    const payload = {
      id: currentSurvey?._id,
      team: currentSurvey?.team,
      questionsOrder: ids,
    };
    dispatch(surveyActions.reorderSurveyQuestion(payload));
  };

  const handleDelete = () => {
    const updatedOptions = options.filter((item, i) => item._id !== selectedId);
    setOptions(updatedOptions);

    const payload = {
      surveyId: currentSurvey?._id,
      team: currentSurvey?.team,
      questionId: selectedId,
    };
    dispatch(surveyActions.removeSurveyQuestion(payload));
  };

  const [t] = useTranslation();
  const { handleSubmit } = useForm<FormType>({
    defaultValues: {
      targetAudience: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const onOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (currentSurvey?.questions) {
      setOptions(currentSurvey.questions);
    }
  }, [currentSurvey]);

  return (
    <Wrapper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        minH="100%"
        height={"full"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mb={{ base: 2, md: 15 }} mt={{ base: 2, md: 5 }}>
            <Heading fontSize="2xl" textAlign="center" fontWeight="medium">
              <Text my="2"> {currentSurvey?.title}</Text>
              <Text fontSize="md" color="primary.500" fontWeight="medium">
                {currentSurvey?.description}
              </Text>
            </Heading>
            <Card
              variant="outline"
              rounded="2xl"
              overflow="hidden"
              p={5}
              mt={{ base: 2, md: 4 }}
            >
              <Accordion w="2xl" defaultIndex={[0]} allowMultiple>
                <AccordionItem
                  border="1px solid #E6EAEE"
                  rounded="2xl"
                  mb={4}
                  bg="primary.50"
                  p="4"
                >
                  <AccordionButton
                    justifyContent="space-between"
                    my="2"
                    _hover={{ bg: "primary.50" }}
                  >
                    <HStack>
                      <Image src="/add_questions.svg" boxSize="40px" />
                      <Text
                        color="primary.700"
                        fontSize={{ base: "sm", sm: "xl" }}
                        fontWeight="medium"
                      >
                        {t("questions.addQuestion")}
                      </Text>
                    </HStack>
                    <Icon as={HiOutlineChevronDoubleDown} />
                  </AccordionButton>
                  <AccordionPanel p={4} bg="white" rounded="md">
                    <Stack>
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
                                onClick={() =>
                                  console.log("clicked for editing")
                                }
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

                      <Button
                        variant={"ghost"}
                        border="1px"
                        borderStyle="dashed"
                        color="brand.500"
                        onClick={onOpen}
                      >
                        {t("questions.addNewQuestion")}
                      </Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Card>
          </Stack>
          <Box
            boxShadow="2xl"
            p="4"
            bg="transparent"
            rounded="lg"
            w="fit-content"
            m="auto"
          >
            <Flex justify="center" align="center">
              <Button
                variant="outline"
                color="brand.500"
                borderColor={"brand.500"}
                onClick={onPreviewOpen}
                mr={6}
                type="submit"
                disabled={currentSurvey?.questions.length === 0}
              >
                {t("common.save")}
              </Button>
              <SVButton
                onClick={onPreviewOpen}
                type="submit"
                disabled={currentSurvey?.questions.length === 0}
              >
                {t("common.saveAndPublish")}
              </SVButton>
            </Flex>
          </Box>
        </form>
      </Box>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        confirmHandler={handleDelete}
        title={t("questions.confirmDelete")}
        bodyText={t("questions.confirmDeleteBlurb")}
      />
      <Questions isOpen={isOpen} onClose={onOpen} />
      <SurveyPreview isOpen={isPreviewOpen} onClose={onPreviewClose} />
    </Wrapper>
  );
};

export default Survey;
