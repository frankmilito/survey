import { FilterFormValues } from "@/app/components/modal/FilterModal";
import { SVFormControl } from "@/app/components/ui/forms/FormControl";
import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PurchaseBehavior = () => {
  const { register, setValue } = useFormContext<FilterFormValues>();
  const [t] = useTranslation();
  const [range, setRange] = useState<[number, number]>([20, 80]);

  const handleChange = (values: [number, number]) => {
    setRange(values);
  };

  useEffect(() => {
    const rangeVal = `${range[0]}-${range[1]}`;
    setValue("averageValue", rangeVal);
  }, [range, setValue]);

  return (
    <VStack spacing={4}>
      <SVFormControl label={t("filters.purchaseFrequency")}>
        <Select
          {...register("purchaseFrequency")}
          focusBorderColor="purple.400"
        >
          <option value="first">First time-buyer</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.productCategories")}>
        <Select {...register("categories")} focusBorderColor="purple.400">
          <option value="electronics">Electronics</option>
        </Select>
      </SVFormControl>
      <SVFormControl label={t("filters.orderValue")}>
        <RangeSlider
          defaultValue={range}
          min={0}
          max={100}
          step={5}
          onChange={handleChange}
        >
          <RangeSliderTrack bg="primary.100">
            <RangeSliderFilledTrack bg="brand.700" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0}>
            <Box
              position="absolute"
              top="35px"
              bg="brand.100"
              p={2}
              borderRadius="md"
              fontSize="sm"
              color="primary.800"
              shadow="sm"
              fontWeight="bold"
            >
              {range[0]}
            </Box>
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={6} index={1}>
            <Box
              position="absolute"
              top="35px"
              bg="brand.100"
              p={2}
              borderRadius="md"
              fontSize="sm"
              color="primary.800"
              shadow="sm"
              fontWeight="bold"
            >
              {range[1]}
            </Box>
          </RangeSliderThumb>
        </RangeSlider>
      </SVFormControl>
    </VStack>
  );
};

export default PurchaseBehavior;
