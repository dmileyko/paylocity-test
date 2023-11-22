import React, { useContext, useState } from "react";
import { Enrollment, Plan } from "../../types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";
import { DISCOUNT } from "../../plans";

interface ProductComponentProps {
  plans: Plan[];
  type: string;
}

const initialEnrollment: Enrollment = {
  planId: 0,
  familyMembers: [],
};

const ProductComponent = ({
  plans,
  type,
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

  const hasSpouse =
    employee.dependents.filter((d) => d.type === "Spouse").length > 0;

  const children = employee.dependents.filter((d) => d.type !== "Spouse");
  const spouse = employee.dependents.filter((d) => d.type === "Spouse")[0];

  const handleFamilyMemberSelect = (
    memberIndex: number,
    isChecked: boolean
  ) => {
    const updatedFamilyMembers = isChecked
      ? [...formData.familyMembers, memberIndex]
      : formData.familyMembers.filter((i) => i !== memberIndex);

    setFormData({
      ...formData,
      familyMembers: updatedFamilyMembers,
    });
  };

  const handlePlanSelect = (id: number) => {
    setFormData({
      ...formData,
      planId: id,
    });
  };

  const shouldApplyDiscount = (name: string) => {
    const lowerCaseName = (name ?? "").toLowerCase();
    return lowerCaseName === "a";
  };

  const planCost = (plan: Plan) => {
    let cost = 0;
    const spouse = employee.dependents.filter((d) => d.type === "Spouse")[0];
    const children = employee.dependents.filter((d) => d.type !== "Spouse");

    if (formData.familyMembers.includes(1)) {
      cost += shouldApplyDiscount(employee.firstname)
        ? plan.applicantRate * (1 - DISCOUNT)
        : plan.applicantRate;
    }

    if (formData.familyMembers.includes(2)) {
      cost += shouldApplyDiscount(spouse?.firstname)
        ? plan.dependentRate * (1 - DISCOUNT)
        : plan.dependentRate;
    }

    children.map((child, idx) => {
      if (formData.familyMembers.includes(idx + 3)) {
        cost += shouldApplyDiscount(child?.firstname)
          ? plan.dependentRate * (1 - DISCOUNT)
          : plan.dependentRate;
      }
    });

    return cost;
  };

  return (
    <Box key={type} m={1} p={1}>
      <h2>Select {type} plan</h2>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => handleFamilyMemberSelect(1, e.target.checked)}
            />
          }
          label={`Applicant (${employee.firstname} ${employee.lastname})`}
        />
        {hasSpouse && (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => handleFamilyMemberSelect(2, e.target.checked)}
              />
            }
            label={`Spouse (${spouse.firstname} ${spouse.lastname})`}
          />
        )}
        {children.map((child, idx) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  handleFamilyMemberSelect(idx + 3, e.target.checked)
                }
              />
            }
            label={`Child (${child.firstname} ${child.lastname})`}
          />
        ))}
      </FormGroup>

      <div style={{ marginTop: "3rem", display: "flex", flexDirection: "row" }}>
        {plans.map((plan: Plan) => (
          <Card raised={plan.id === formData.planId}>
            <CardHeader title={plan.name} />
            <CardContent>
              Additional plan information.
              <Typography>Cost: {planCost(plan)}</Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="outlined"
                color="info"
                onClick={() => handlePlanSelect(plan.id)}
              >
                Select Plan
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default ProductComponent;
