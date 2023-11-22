import React, { useContext, useState } from "react";
import { Enrollment, Plan } from "../../types";
import {
  Box
} from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";
import { DISCOUNT } from "../../plans";

const CartComponent = (): JSX.Element => {
  const { employee, setEmployee } = useContext(ProfileContext);

  const hasSpouse =
    employee.dependents.filter((d) => d.type === "Spouse").length > 0;

  const children = employee.dependents.filter((d) => d.type !== "Spouse");
  const spouse = employee.dependents.filter((d) => d.type === "Spouse")[0];

  return (
    <Box m={1} p={1}>
      <h2>Selected Coverage:</h2>
    </Box>      
  );
};

export default CartComponent;
