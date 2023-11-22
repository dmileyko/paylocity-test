import React, { useState } from "react";
import { Enrollment, Plan } from "../../types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SelectChangeEvent
} from "@mui/material";

interface ProductComponentProps {
  plans: Plan[];
  type: string;  
}

const initialEnrollment: Enrollment = { 
  plan: null,
  familyMembers: []
};

const ProductComponent = ({
  plans,
  type
}: ProductComponentProps): JSX.Element => {
  
  const [formData, setFormData] = useState({ ...initialEnrollment });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value.trim(),
    };

    setFormData(newFormData);
    //handleUpdateEnrollment(idx, newFormData);
  };

  return (
    <Box key={type} m={5} p={5}>
      {plans.map((plan: Plan) => (
        <Card>
          <CardHeader title={plan.name} />
          <CardContent>         
            Additional plan information goes here
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductComponent;
