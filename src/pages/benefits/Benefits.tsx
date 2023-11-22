import React, { useContext } from "react";
import { PLANS } from "../../plans";
import { Grid } from "@mui/material";
import { PlanType } from "../../types";
import Product from "../../components/product/Product";
import CartComponent from "../../components/cart/Cart";

const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const Benefits = () => {
  const plansByType = groupBy(PLANS, "type");

  return (
    <Grid container spacing={2}>
      <Grid item md={10}>
        {Object.keys(plansByType).map((planType) => (
          <Product
            key={planType}
            plans={plansByType[planType]}
            type={planType as PlanType}
          />
        ))}
      </Grid>
      <Grid item md={2}>
        <CartComponent />
      </Grid>
    </Grid>
  );
};

export default Benefits;
