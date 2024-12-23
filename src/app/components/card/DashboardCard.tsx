import {
  CardBody,
  Card,
  Box,
  CardHeader,
  Text,
  Select,
  Flex,
  Stack,
  CardProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  title: string;
  headerComponent: ReactNode;
} & CardProps;

const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  title,
  headerComponent,
}) => {
  return (
    <Card borderRadius="xl" p="2" variant="outline" bg="primary.50">
      <Box p="1" alignItems="center">
        <CardHeader px="0">
          <Flex
            justify="space-between"
            align={{ sm: "center", md: "end" }}
            py="2"
          >
            <Text
              fontSize={{ base: "sm", sm: "xl", md: "2xl" }}
              color="primary.800"
              fontWeight="medium"
            >
              {title}
            </Text>
            <Stack>{headerComponent}</Stack>
          </Flex>
        </CardHeader>
        <CardBody p="0" borderRadius="xl">
          <Box
            bg="white"
            rounded="lg"
            p={{ base: 2, sm: 0, md: 4 }}
            borderRadius="md"
          >
            {children}
          </Box>
        </CardBody>
      </Box>
    </Card>
  );
};

export default DashboardCard;
