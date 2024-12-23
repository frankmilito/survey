import CheckList from "@/app/components/ui/forms/CheckList";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import {
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Preview from "@/app/components/card/Preview";
import DraggableList from "@/app/components/drag-drop";

const MultiChoice = ({ currentOption }: { currentOption?: string[] }) => {
  const [t] = useTranslation();
  const { register, watch, control } = useFormContext();

  const [options, setOptions] = useState([
    { id: "1", value: "Option1", label: "Option 1" },
    { id: "2", value: "Option2", label: "Option 2" },
    { id: "3", value: "Option3", label: "Option 3" },
  ]);
  const formValue = watch();

  useEffect(() => {
    if (currentOption) {
      const normalizedOptions = currentOption?.map((item, index) =>
        typeof item === "string"
          ? {
              id: `${index}-${Date.now()}`,
              value: item,
              label: item,
            }
          : item
      );
      setOptions(normalizedOptions);
    }
  }, [currentOption]);

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
      value: `Option${options.length + 1}`,
      label: `Option ${options.length + 1}`,
    };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const handleChange = (e, id) => {
    const updatedValue = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id
          ? { ...option, value: updatedValue, label: updatedValue }
          : option
      )
    );
  };

  console.log(options);

  return (
    <Stack>
      <Text color="primary.500">{t("questions.question")}</Text>
      <DraggableList
        items={options}
        onDragEnd={onDragEnd}
        renderItem={(item, index) => (
          <HStack w="full">
            <SVFormControl
              inputProps={{
                onChange: (e) => handleChange(e, item.id),
                value: item.value,
              }}
              placeholder={item.value}
            />
            <Image src="/drag-drop.svg" boxSize="24px" cursor="move" />
            <Image
              src="/delete.svg"
              boxSize="24px"
              cursor="pointer"
              onClick={() => handleDelete(index)}
            />
          </HStack>
        )}
      />

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

      <Checkbox {...register("allowOtherAnswer")} colorScheme="purple" my={8}>
        <Text fontWeight="medium">{t("questions.allowOthers")} </Text>
        <Text fontSize="sm" color="primary.600">
          {t("questions.customersBlurb")}
        </Text>
      </Checkbox>
      <Preview>
        <CheckList
          control={control}
          options={options}
          name="useCase"
          otherValue={formValue.allowOtherAnswer}
        />
      </Preview>
    </Stack>
  );
};

export default MultiChoice;
