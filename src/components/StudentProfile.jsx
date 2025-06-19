import React, { useState } from "react";
import { Typography, Tabs, Tab, Box } from "@mui/material";
import ContestHistory from "./ContestHistory";
import ProblemSolvingStats from "./ProblemSolvingStats";

const StudentProfile = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Student Profile
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Contest History" />
        <Tab label="Problem Solving Data" />
      </Tabs>

      {tabIndex === 0 && <ContestHistory />}
      {tabIndex === 1 && <ProblemSolvingStats />}
    </Box>
  );
};

export default StudentProfile;
