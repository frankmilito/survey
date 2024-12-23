import {
  Card,
  Stack,
  Text,
  Link as ChakraLink,
  Heading,
  useClipboard,
  Input,
  Grid,
  GridItem,
  Image,
  InputGroup,
  InputRightAddon,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TbCopy, TbExternalLink } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import { appActions } from "@/app/data/app/slices/slice";
const Welcome = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const teamId = useAppSelector((state) => state.app.team);
  const companyDetails = useAppSelector(surveySelector.getCompany);
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    companyDetails?.credential?.publicKey
  );

  useEffect(() => {
    dispatch(appActions.getProfile());
  }, []);

  useEffect(() => {
    if (teamId) {
      dispatch(surveyActions.getCompany(teamId));
    }
  }, [teamId]);

  return (
    <Card p={4} borderColor="brand.700" bg="#9A76F30D" borderRadius="xl">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
        alignItems="center"
      >
        <GridItem colSpan={4}>
          <Heading fontSize={{ base: "lg", sm: "xl", md: "2xl" }}>
            {t("dashboard.welcome")}
          </Heading>
          <Stack>
            <Text mt="5" fontSize={{ sm: "sm", md: "md" }}>
              To get started, explore our{" "}
              <ChakraLink
                textDecoration="underline"
                as={Link}
                color="brand.700"
                to="#"
                fontWeight="medium"
              >
                integration documentation
              </ChakraLink>
              to seamlessly add Safiyo to your site or checkout flow.
            </Text>
            <Text mb="3" fontSize={{ sm: "sm", md: "md" }}>
              <Text display="inline" fontWeight="medium">
                Need Assistance?
              </Text>{" "}
              Schedule time with a Safiyo representative, or reach out to our
              support team at{" "}
              <ChakraLink
                as={Link}
                color="brand.700"
                to="#"
                fontWeight="medium"
              >
                support@safiyo.com{" "}
              </ChakraLink>
              for personalized help.
            </Text>
            <Text fontWeight="semibold" fontSize={{ sm: "sm", md: "md" }}>
              Your Publishable API Key
            </Text>
            <HStack
              flexWrap="wrap"
              spacing={{ base: 0, md: 4 }}
              justifyContent={{ base: "start", md: "flex-start" }}
              direction={{ base: "column", md: "row" }}
            >
              <InputGroup mb={2} w="fit-content" mr={5}>
                <Input
                  readOnly
                  cursor="pointer"
                  focusBorderColor="gray.200"
                  w={{
                    sm: "100%",
                    md: "md",
                  }}
                  placeholder={"EXAMPLE_KEY_HERE_12345_ABCD6789"}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <InputRightAddon cursor="pointer" onClick={onCopy}>
                  <TbCopy color="#8B5CF6" />
                  <Text ml="1" color="#8B5CF6" fontWeight="medium">
                    {hasCopied ? "Copied!" : "Copy"}
                  </Text>
                </InputRightAddon>
              </InputGroup>
              <ChakraLink
                textDecoration="underline"
                as={Link}
                color="brand.700"
                to="#"
                fontWeight="bold"
                fontSize={{ sm: "sm", md: "md" }}
              >
                Safiyo SDK Documentation{" "}
                <IconButton
                  aria-label="external"
                  variant="link"
                  color="#4A22B3"
                >
                  <TbExternalLink />
                </IconButton>
              </ChakraLink>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem display={{ base: "none", md: "block" }}>
          <Image src="/welcomeBanner.svg" />
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Welcome;
