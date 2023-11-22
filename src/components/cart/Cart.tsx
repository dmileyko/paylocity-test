import "./cart.scss";
import React, { useContext } from "react";
import { Enrollment } from "../../types";
import { Box } from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";

const CartComponent = (): JSX.Element => {
  const { employee, setEmployee } = useContext(ProfileContext);

  const totalCost = employee.enrollments.reduce(
    (acc, enrollment) => acc + enrollment.cost,
    0
  );

  return (
    <Box m={1} p={1}>
      <h2>Selected Coverage:</h2>
      <hr></hr>
      {employee.enrollments.map((enrollment: Enrollment) => (
        <dl className="grid-dl" key={enrollment.type}>
          <dt>{enrollment.type}</dt>
          <dd>${enrollment.cost}</dd>
        </dl>
      ))}
      <br />
      <h2>Total:</h2>
      <dl className="grid-dl">
        <dt>Cost</dt>
        <dd>${totalCost}</dd>
      </dl>
    </Box>
  );
};

export default CartComponent;
