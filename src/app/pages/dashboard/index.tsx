import Overview from "@/app/components/overview";
import RecentSurveys from "@/app/components/recent-surveys";
import Survey from "@/app/components/survey";
import Welcome from "@/app/components/welcome";
import Wrapper from "@/app/components/wrapper";
import { Stack } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  return (
    <Wrapper>
      <Stack spacing={8} m={4} mt={8}>
        <Welcome />
        <Overview />
        <RecentSurveys />
        <Survey />
      </Stack>
    </Wrapper>
  );
};

export default Dashboard;
