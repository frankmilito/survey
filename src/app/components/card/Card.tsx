import {
  CardBody,
  Card,
  Box,
  Container,
  ContainerProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardLayoutProps {
  children: ReactNode;
  containerProps?: ContainerProps;
}
const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  containerProps,
}) => {
  return (
    <Container
      maxW="2xl"
      py={{ base: 9, md: 20 }}
      px={{ base: 3, md: 8 }}
      {...containerProps}
    >
      <Card borderRadius="xl" p={{ base: 1 }} variant="outline">
        <Box p="4">
          <CardBody p={{ sm: 4, md: 8 }} bg="brand.100" borderRadius="xl">
            <Box
              bg="white"
              rounded="lg"
              p={{ base: 4, md: 10 }}
              borderRadius="md"
            >
              {children}
            </Box>
          </CardBody>
        </Box>
      </Card>
    </Container>
  );
};

export default CardLayout;
