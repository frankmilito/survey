import { Box, Card, CardProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../ui/nav/Navbar";

type WrapperProps = {
  children: ReactNode;
} & CardProps;
const Wrapper = ({ children, ...props }: WrapperProps) => {
  const [t] = useTranslation();
  return (
    <Card
      variant="outline"
      m={{ base: 0, md: 2 }}
      minH="100vh"
      borderRadius="xl"
      {...props}
    >
      <Navbar />
      {/* <Box
      //Todo TBD
        as="nav"
        w="full"
        py={4}
        px={6}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex maxW="full" mx="auto" justify="space-between" align="center">
          <HStack spacing={2}>
            <Image src={"/name-logo.svg"} alt="app logo" height="30px" />
          </HStack>

          <Button
            variant="ghost"
            color="red.500"
            px="0"
            rightIcon={
              <Image src={"/logout.svg"} alt="app logo" height="20px" />
            }
            _hover={{ bg: "red.50" }}
          >
            {t("common.logout")}
          </Button>
        </Flex>
      </Box> */}
      <Box>{children}</Box>
    </Card>
  );
};

export default Wrapper;
