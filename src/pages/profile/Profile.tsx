import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Dependent, Employee } from "../../types";
import DependentComponent from "../../components/dependent/Dependent";
import { ProfileContext } from "../home/Home";

const Profile = () => {  
  const initialDependent: Dependent = {
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    type: "Spouse",
  };

  const { employee, setEmployee } = useContext(ProfileContext);

  const addChild = () => {
    setEmployee({
      ...employee,
      dependents: [...employee?.dependents, {
        ...initialDependent,
      type: 'Child'
    }],
    } as Employee);
  };

  const addSpouse = () => {
    setEmployee({
      ...employee,
      dependents: [...employee?.dependents, {
        ...initialDependent,
      type: 'Spouse'
    }],
    } as Employee);
  };

  const removeDependent = (idx: number) => {
    setEmployee({
      ...employee,
      dependents: employee.dependents.filter((_: any, i: number) => i !== idx),
    } as Employee);
  };

  const updateDependent = (idx: number, value: Dependent) => {
    employee.dependents.splice(idx, 1, value);
    setEmployee({
      ...employee,
      dependents: employee.dependents,
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <Box>
      <form>
        <TextField
          name="firstname"
          label="First Name"
          size="small"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          onChange={handleChange}
          value={employee.firstname}
          required
        />
        <TextField
          name="lastname"
          label="Last Name"
          size="small"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          onChange={handleChange}
          value={employee.lastname}
          required
        />
        <TextField
          name="dpb"
          label="Date of Birth"
          size="small"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          onChange={handleChange}
          value={employee.dob}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="gender"
            value={employee.gender ?? ""}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={""}>Select Gender</MenuItem>
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
          </Select>
        </FormControl>
        {employee?.dependents?.map((dep: Dependent, idx: number) => (
          <DependentComponent
            data={dep}
            idx={idx}
            handleRemoveDependent={removeDependent}
            handleUpdateDependent={updateDependent}
          />
        ))}
        {!employee.dependents.find((r) => r.type === "Spouse") ? (
          <Button color="primary" variant="contained" onClick={addSpouse}>
            Add Spouse
          </Button>
        ) : null}
        <Button color="primary" variant="contained" onClick={addChild}>
          Add Child
        </Button>
      </form>
    </Box>
  );
};

export default Profile;
