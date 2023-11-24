import "./cart.scss";
import React, { useContext } from "react";
import { Enrollment } from "../../types";
import { Box, Typography } from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";
import { INCOME_PER_PAYCHECK, PAY_PERIOD_FACTOR } from "../../plans";
import { numberFormat } from "../../utils/formats";

const CartComponent = (): JSX.Element => {
  const { employee, setEmployee } = useContext(ProfileContext);

  const totalCost = employee.enrollments.reduce(
    (acc, enrollment) => acc + enrollment.cost,
    0
  );

  return (
    <Box m={1} p={1}>
      <h3>Earnings per pay:</h3>
      <dl className="grid-dl" key='earnings'>
        <dt>Regular Pay</dt>
        <dd>${INCOME_PER_PAYCHECK}</dd>
      </dl>
      <br />
      <h3>Deductions per pay:</h3>
      <hr />
      {employee.enrollments.map((enrollment: Enrollment) => (
        <dl className="grid-dl" key={enrollment.type}>
          <dt>{enrollment.type}</dt>
          <dd>{numberFormat(enrollment.cost * PAY_PERIOD_FACTOR)}</dd>
        </dl>
      ))}
      <dl className="grid-dl" key="totalDeductions">
        <dt>Total Deductions</dt>
        <dd>{numberFormat(totalCost * PAY_PERIOD_FACTOR)}</dd>
      </dl>
      <br />
      <h3>Total Pay:</h3>
      <Typography fontSize={40} color="green">
        {numberFormat(INCOME_PER_PAYCHECK - totalCost * PAY_PERIOD_FACTOR)}
      </Typography>
    </Box>
  );
};

export default CartComponent;
