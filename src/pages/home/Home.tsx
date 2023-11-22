import React, { createContext, useState } from "react";
import Profile from "../profile/Profile";
import Benefits from "../benefits/Benefits";
import { Box, Tab, Tabs } from "@mui/material";
import { Employee } from "../../types";

enum TabTypes {
  PROFILE = "Profile",
  BENEFITS = "Benefits",
}

const initialEmployeeData: Employee = {
  firstname: "",
  lastname: "",
  gender: "",
  dob: "",
  dependents: [],
  type: "Applicant",
  enrollments: [],
};

export type ProfileContextType = {
  employee: Employee;
  setEmployee: (val: Employee) => void;
};

export const ProfileContext = createContext<ProfileContextType>({
  employee: initialEmployeeData,
  setEmployee: (_val) => {
    return;
  },
});

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.PROFILE);
  const [employee, setEmployee] = useState<Employee>(initialEmployeeData);

  const handleTabsChange = (
    event: React.SyntheticEvent,
    newValue: TabTypes
  ) => {
    setActiveTab(newValue);
  };

  const tabsContent = {
    [TabTypes.PROFILE]: <Profile />,
    [TabTypes.BENEFITS]: <Benefits />,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <ProfileContext.Provider value={{ employee, setEmployee }}>
        <Tabs
          onChange={handleTabsChange}
          aria-label="wrapped label tabs example"
          orientation="vertical"
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: "divider" }}
          value={activeTab}
        >
          <Tab value={TabTypes.PROFILE} label="Profile" />
          <Tab value={TabTypes.BENEFITS} label="Benefits" />
        </Tabs>
        {tabsContent[activeTab]}
      </ProfileContext.Provider>
    </Box>
  );
};

export default Home;
