import Preview from "@/app/components/card/Preview";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const scaleSchema = z.object({
  selectedValue: z.number().min(1, "Value must be between 1 and 10").max(10),
});

type ScaleFormData = z.infer<typeof scaleSchema>;
const PromoterOption = () => {
  const { control } = useForm({});
  return (
    <Preview>
      {/* Scale Selector */}
      <Controller
        name="selectedValue"
        control={control}
        render={({ field }) => (
          <Flex gap={4}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
              <Button
                key={value}
                size="md"
                variant={field.value === value ? "solid" : "outline"}
                colorScheme={field.value === value ? "purple" : "gray"}
                onClick={() => field.onChange(value)}
              >
                {value}
              </Button>
            ))}
          </Flex>
        )}
      />
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        gap={4}
        mt={4}
      >
        <Text fontSize="sm">Not Likely</Text>

        <Text fontSize="sm">Very Likely</Text>
      </Flex>
    </Preview>
  );
};

export default PromoterOption;
