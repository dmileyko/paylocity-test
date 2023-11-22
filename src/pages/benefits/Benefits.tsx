import React, { useContext, useEffect } from 'react'
import { PLANS } from '../../plans';
import { ProfileContext } from '../home/Home';
import { Card, Typography } from '@mui/material';
import { Plan } from '../../types';
import Product from '../../components/product/Product';

const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const Benefits = () => {
  const { employee, setEmployee } = useContext(ProfileContext);
  
  const plansByType = groupBy(PLANS, 'type');
  
  return (    
    <div> 
      <Typography>Select Plans</Typography>
       {Object.keys(plansByType).map((planType) => (
          <Product plans={plansByType[planType]} type={planType} />
       ))}          
    </div>
  )
}

export default Benefits
