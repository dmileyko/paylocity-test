import React, { useContext, useEffect } from "react";
import { PLANS } from "../../plans";
import { ProfileContext } from "../home/Home";
import { Card, Grid, Typography } from "@mui/material";
import { Plan } from "../../types";
import Product from "../../components/product/Product";

const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const Benefits = () => {
  const { employee, setEmployee } = useContext(ProfileContext);

  const plansByType = groupBy(PLANS, "type");

  return (    
    <Grid container spacing={2}>
      <Grid item md={10}>
        {Object.keys(plansByType).map((planType) => (
          <Product plans={plansByType[planType]} type={planType} />
        ))}
      </Grid>
      <Grid item md={2}>
        Cart
      </Grid>
    </Grid>
  );
};

export default Benefits;
