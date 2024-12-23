import {
  Center,
  Divider,
  Grid,
  GridItem,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import DashboardCard from "../card/DashboardCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  surveyActions,
  surveySelector,
} from "@/app/data/app/slices/surveySlice";

const Overview = () => {
  const teamId = useAppSelector((state) => state.app.team);
  const stats = useAppSelector(surveySelector.getSurveyStats);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (teamId) dispatch(surveyActions.getStats(teamId));
  }, [teamId]);

  const overviewList = [
    {
      icon: "/total_surveys",
      title: "Total Survey(s)",
      count: stats?.totalSurveys,
    },
    {
      icon: "/active_surveys",
      title: "Active Survey(s)",
      count: stats?.activeSurveys,
    },
    {
      icon: "/completed_surveys",
      title: "Completed Survey(s)",
      count: stats?.completedSurveys,
    },
    {
      icon: "/total_responses",
      title: "Total Responses(s)",
      count: stats?.totalResponses,
    },
  ];
  return (
    <DashboardCard
      title="Overview"
      headerComponent={
        <Select borderColor="primary.200">
          <option value="option1">This year</option>
          <option value="option2">Last month</option>
          <option value="option3">Last year</option>
        </Select>
      }
    >
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {overviewList.map((item, index) => (
          <GridItem
            key={item.title}
            w="100%"
            p="5"
            gap={100}
            borderRight={
              index !== overviewList.length - 1 ? "3px solid #f9f9f9" : "none"
            }
          >
            <Image src={`${item.icon}.svg`} bgSize="40px" />
            <Text color="primary.600" fontWeight="medium" my="2">
              {item.title}
            </Text>
            <Text fontWeight="bold" fontSize={"3xl"}>
              {item.count}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default Overview;
