import DashboardCard from "../card/DashboardCard";
import {
  Grid,
  GridItem,
  Button,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { SVFormControl } from "../ui/forms/FormControl";
import { TbPlus } from "react-icons/tb";
import SVButton from "../ui/button";
import CreateSurvey from "../modal";

const Survey = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardCard
      title="Survey Stream"
      headerComponent={
        <SVButton onClick={onOpen} rightIcon={<TbPlus />}>
          Create Survey
        </SVButton>
      }
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{
          base: 0,
          md: 6,
        }}
      >
        <GridItem w="100%" p="5" gap={100}>
          <SVFormControl
            label={"Select Survey"}
            placeholder="Enter Job title"
            //   error={errors.jobTitle}
          >
            <Select placeholder="Jumia" focusBorderColor="purple.400">
              {["Test1", "Test2"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </SVFormControl>
        </GridItem>
        <GridItem w="100%" p="5" gap={100}>
          <SVFormControl
            label={"Select Target"}
            placeholder="Enter Job title"
            //   error={errors.jobTitle}
          >
            <Select placeholder="New Customers" focusBorderColor="purple.400">
              {["Test1", "Test2"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </SVFormControl>
        </GridItem>
        <GridItem w="100%" p="5" gap={100}>
          <SVFormControl
            label={"Select Question Type"}
            placeholder="Enter Job title"
            //   error={errors.jobTitle}
          >
            <Select placeholder="Multiple Choice" focusBorderColor="purple.400">
              {["Test1", "Test2"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </SVFormControl>
        </GridItem>
      </Grid>
      <CreateSurvey onClose={onClose} isOpen={isOpen} />
    </DashboardCard>
  );
};

export default Survey;
