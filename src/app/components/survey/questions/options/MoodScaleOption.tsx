import CheckList from "@/app/components/ui/forms/CheckList";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Preview from "@/app/components/card/Preview";

const schema = z.object({
  selectedOption: z.string().array(),
  otherValue: z.string().optional(),
});

const MoodScaleOption = () => {
  const [t] = useTranslation();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedOption: [],
      otherValue: "",
    },
    resolver: zodResolver(schema),
  });

  const [options, setOptions] = useState([
    { id: "1", value: "Option 1" },
    { id: "2", value: "Option 2" },
    { id: "3", value: "Option 3" },
  ]);
  const formValue = watch();

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedOptions = Array.from(options);
    const [removed] = reorderedOptions.splice(source.index, 1);
    reorderedOptions.splice(destination.index, 0, removed);
    setOptions(reorderedOptions);
  };

  const handleDelete = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const newOption = {
      id: `${Date.now()}`,
      value: `Option ${options.length + 1}`,
    };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const handleChange = (e, id) => {
    const updatedValue = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: updatedValue } : option
      )
    );
  };

  return (
    <Stack>
      <Text color="primary.500">{t("common.options")}</Text>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              p={2}
              border="1px solid #ccc"
              borderRadius="md"
            >
              {options.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <Stack
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      my={2}
                      p={3}
                    >
                      <Box
                        borderRadius="md"
                        display="flex"
                        justifyContent="space-between"
                        gap={4}
                      >
                        <Card
                          variant="outline"
                          align="center"
                          justify="center"
                          p={2}
                        >
                          <Image src="/star-ico.svg" />
                        </Card>
                        <HStack w="full">
                          <SVFormControl
                            inputProps={{
                              onChange: (e) => handleChange(e, item.id),
                              value: item.value,
                            }}
                            placeholder={item.value}
                          />
                          <Image
                            src="/drag-drop.svg"
                            boxSize="24px"
                            cursor="move"
                          />
                          <Image
                            src="/delete.svg"
                            boxSize="24px"
                            cursor="pointer"
                            onClick={() => handleDelete(index)}
                          />
                        </HStack>
                      </Box>
                    </Stack>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        w="fit-content"
        variant="ghost"
        color="brand.700"
        my={2}
        onClick={handleAddQuestion}
      >
        {t("questions.addNewQuestion")}
      </Button>
      <Divider />

      <Preview>
        <HStack align={"center"} justify="center" gap={8}>
          {options.map((item) => (
            <VStack key={item.id}>
              <Image src="/star.svg" />
              <Text>{item.value}</Text>
            </VStack>
          ))}
        </HStack>
      </Preview>
    </Stack>
  );
};

export default MoodScaleOption;
