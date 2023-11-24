import React, { useContext, useState } from "react";
import { Employee, Enrollment, Plan, PlanType } from "../../types";
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
  Stack,
  Typography,
} from "@mui/material";
import { ProfileContext } from "../../pages/home/Home";
import { DISCOUNT, PAY_PERIOD_FACTOR } from "../../plans";
import { numberFormat } from "../../utils/formats";

interface ProductComponentProps {
  plans: Plan[];
  type: PlanType;
}

const initialEnrollment: Enrollment = {
  cost: 0,
  type: "",
  planId: 0,
  familyMembers: [],
};

const ProductComponent = ({
  plans,
  type,
}: ProductComponentProps): JSX.Element => {
  const { employee, setEmployee } = useContext(ProfileContext);

  // Get current enrollment for this product type
  const existingEnrollment = employee.enrollments?.find((e) => e.type === type);

  const [selectedPlanId, setSelectedPlanId] = useState(
    existingEnrollment?.planId
  );

  const [formData, setFormData] = useState(
    existingEnrollment ? { ...existingEnrollment } : { ...initialEnrollment }
  );

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

    const foundSelectedPlan = plans.find((p) => p.id === selectedPlanId);

    const newEmployeeData = {
      ...formData,
      type,
      familyMembers: updatedFamilyMembers,
    };

    const newFormData = {
      ...newEmployeeData,
      cost: foundSelectedPlan
        ? planCost(foundSelectedPlan, updatedFamilyMembers)
        : 0,
    };

    if (employee.enrollments) {
      const existingEnrollmentIndex =
        employee.enrollments?.findIndex((e) => e.type === type) ?? -1;
      if (existingEnrollmentIndex >= 0) {
        employee.enrollments[existingEnrollmentIndex] = newFormData;
      } else {
        employee.enrollments?.push(newFormData);
      }
    }

    setFormData(newFormData);
    setEmployee({
      ...employee,
      enrollments: employee.enrollments,
    });
  };

  const handlePlanSelect = (id: number) => {
    const planSelected = plans.find((p) => p.id === id);

    const newFormData = {
      ...formData,
      type,
      planId: id,
      cost: planSelected ? planCost(planSelected, formData.familyMembers) : 0,
    };

    setFormData(newFormData);
    setSelectedPlanId(id);

    if (employee.enrollments) {
      const existingEnrollmentIndex =
        employee.enrollments?.findIndex((e) => e.type === type) ?? -1;
      if (existingEnrollmentIndex >= 0) {
        employee.enrollments[existingEnrollmentIndex] = newFormData;
      } else {
        employee.enrollments?.push(newFormData);
      }
    }
    setEmployee({
      ...employee,
      enrollments: employee.enrollments,
    });
  };

  const shouldApplyDiscount = (name: string) => {
    const lowerCaseName = (name ?? "").toLowerCase();
    return lowerCaseName === "a";
  };

  const planCost = (plan: Plan, familyMembers: number[]) => {
    let cost = 0;
    const spouse = employee.dependents.filter((d) => d.type === "Spouse")[0];
    const children = employee.dependents.filter((d) => d.type !== "Spouse");

    if (familyMembers.includes(1)) {
      cost += shouldApplyDiscount(employee.firstname)
        ? plan.applicantRate * (1 - DISCOUNT)
        : plan.applicantRate;
    }

    if (familyMembers.includes(2)) {
      cost += shouldApplyDiscount(spouse?.firstname)
        ? plan.dependentRate * (1 - DISCOUNT)
        : plan.dependentRate;
    }

    children.map((child, idx) => {
      if (familyMembers.includes(idx + 3)) {
        cost += shouldApplyDiscount(child?.firstname)
          ? plan.dependentRate * (1 - DISCOUNT)
          : plan.dependentRate;
      }
    });

    return cost;
  };

  return (
    <Box key={type} mb={4} ml={3} p={1}>
      <h2>Choose family members and {type} plan</h2>
      <FormGroup>
        <FormControlLabel
          key={`applicant_${type}`}
          control={
            <Checkbox
              checked={formData.familyMembers.includes(1)}
              onChange={(e) => handleFamilyMemberSelect(1, e.target.checked)}
            />
          }
          label={`Applicant (${employee.firstname} ${employee.lastname})`}
        />
        {hasSpouse && (
          <FormControlLabel
            key={`spouse_${type}`}
            control={
              <Checkbox
                checked={formData.familyMembers.includes(2)}
                onChange={(e) => handleFamilyMemberSelect(2, e.target.checked)}
              />
            }
            label={`Spouse (${spouse.firstname} ${spouse.lastname})`}
          />
        )}
        {children.map((child, idx) => (
          <FormControlLabel
            key={`child_${type}_${idx}`}
            control={
              <Checkbox
                checked={formData.familyMembers.includes(idx + 3)}
                onChange={(e) =>
                  handleFamilyMemberSelect(idx + 3, e.target.checked)
                }
              />
            }
            label={`Child (${child.firstname} ${child.lastname})`}
          />
        ))}
      </FormGroup>

      <Stack direction="row" spacing={2}>
        {plans.map((plan: Plan) => (
          <Card raised={plan.id === formData.planId} key={plan.id}>
            <CardHeader titleTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }} title={plan.name} />
            <CardContent>
              {plan.benefits}
              <hr />
              <Typography>
                {numberFormat(planCost(plan, formData.familyMembers) * PAY_PERIOD_FACTOR)} per pay
              </Typography>
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
      </Stack>
    </Box>
  );
};

export default ProductComponent;
