import React, { useContext, useState } from "react";
import { Enrollment, Plan } from "../../types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";

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
  
  const { employee, setEmployee } = useContext(ProfileContext);
  
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

  const hasSpouse = employee.dependents.filter((d) => d.type === 'Spouse').length > 0;
  const children = employee.dependents.filter((d) => d.type !== 'Spouse');

  return (
    <Box key={type} m={1} p={1}>
      <h2 >Select {type} plan</h2>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Applicant" />  
        {hasSpouse && 
          <FormControlLabel control={<Checkbox />} label="Spouse" />
        }
        {children.map((child) => (<FormControlLabel control={<Checkbox />} label={`Child (${child.firstname} ${child.lastname})`} />))}
      </FormGroup>

      <div style={{marginTop: '3rem', display: 'flex', flexDirection: 'row'}}>
        {plans.map((plan: Plan) => (
          <Card>
            <CardHeader title={plan.name} />
            <CardContent>         
              Additional plan information goes here
              <hr />
              Cost: $1000
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default ProductComponent;
