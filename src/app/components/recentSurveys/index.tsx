import { useTranslation } from "react-i18next";
import DashboardCard from "../card/DashboardCard";
import {
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { CiPause1 } from "react-icons/ci";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

import {
  TbCircleFilled,
  TbDots,
  TbEdit,
  TbEye,
  TbUsersGroup,
} from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";
import { Link } from "react-router-dom";
import { selectors } from "@/app/data/app/slices/slice";

const RecentSurveys = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const teamId = useAppSelector(selectors.getTeam);
  const surveys = useAppSelector(surveySelector.getAllSurvey);

  useEffect(() => {
    if (teamId) {
      dispatch(surveyActions.getAllSurveys(teamId));
    }
  }, [teamId]);

  return (
    <DashboardCard
      title={t("dashboard.recentSurvey")}
      headerComponent={
        <Flex align="center" color="brand.700" fontSize="sm">
          <ChakraLink mr="1" fontWeight="semibold">
            {t("dashboard.viewAll")}
          </ChakraLink>
          <Icon size="xs" as={HiOutlineChevronDoubleRight} />
        </Flex>
      }
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {surveys?.slice(0, 4)?.map((item) => {
          const { title, description, isActive, _id } = item;
          return (
            <GridItem key={item.title} w="100%" p="5">
              <Link to={`/survey/${_id}`}>
                <Card
                  variant="outline"
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  borderColor="primary.100"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="md" fontWeight="bold" color="primary.800">
                      {title}
                    </Text>
                    <Flex align="center">
                      <Text
                        mr={1}
                        color={!isActive ? "red.500" : "green.400"}
                        fontWeight="semibold"
                        fontSize="sm"
                      >
                        {isActive ? "Active" : "Inactive"}
                      </Text>
                      <Icon
                        as={!isActive ? CiPause1 : TbCircleFilled}
                        color={!isActive ? "red.500" : "green.400"}
                      />
                    </Flex>
                  </Flex>

                  <Text fontSize="sm" color="primary.200" mb={4}>
                    {description}
                  </Text>
                  <Divider mb="4" />
                  <Flex mb={4} justify="space-between">
                    <Flex>
                      <Flex align="center" color="#1883FD" fontSize="sm">
                        <Icon as={TbEye} mr={1} />
                        <Text
                          fontSize="xs"
                          fontWeight={"medium"}
                          borderRight="2px solid #e3e3e3"
                          pr="2"
                        >
                          230 views
                        </Text>
                      </Flex>
                      <Flex align="center" color="#03A708" fontSize="sm" pl="2">
                        <Icon as={TbUsersGroup} mr={1} />
                        <Text fontSize="xs" fontWeight={"medium"}>
                          120
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex align="center" color="brand.700" fontSize="sm">
                        <Icon as={TbEdit} mr={1} />
                        <ChakraLink fontSize="xs" fontWeight={"medium"} mr="2">
                          Edit
                        </ChakraLink>
                      </Flex>
                      <Flex align="center">
                        <Icon as={TbDots} mr={1} size="lg" />
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Link>
            </GridItem>
          );
        })}
      </Grid>
    </DashboardCard>
  );
};

export default RecentSurveys;
