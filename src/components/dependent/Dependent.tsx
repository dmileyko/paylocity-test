import React, { useState } from "react";
import { Dependent } from "../../types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface DependentComponentProps {
  data: Dependent;
  idx: number;
  handleRemoveDependent: (idx: number) => void;
  handleUpdateDependent: (idx: number, value: Dependent) => void;
}

const DependentComponent = ({
  data,
  idx,
  handleRemoveDependent,
  handleUpdateDependent,
}: DependentComponentProps): JSX.Element => {

  const [formData, setFormData] = useState({ ...data });
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
    handleUpdateDependent(idx, newFormData);
  };

  return (
    <Box key={idx} pt={3}>
      <Card>
        <CardHeader title={formData.type} />
        <CardContent>
          <TextField
            name="firstname"
            label="First Name"
            size="small"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            onChange={handleChange}
            value={formData.firstname}
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
            value={formData.lastname}
            required
          />
          <TextField
            name="dob"
            label="Date of Birth"
            size="small"
            variant="outlined"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            fullWidth
            sx={{ mb: 3 }}
            onChange={handleChange}
            value={formData.dob}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="gender"
              value={formData.gender ?? ""}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value={""}>Select Gender</MenuItem>
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardActions disableSpacing>
          {formData.type === "Child" ? (
              <Button
                className="rightAlignItem"
                color="error"
                style={{ float: "right" }}
                size="small"
                variant="contained"
                onClick={() => handleRemoveDependent(idx)}
              >
                Remove Child
              </Button>
            ) : null}
            {formData.type === "Spouse" ? (
              <Button
                color="error"
                className="rightAlignItem"
                style={{ textAlign: "right" }}
                size="small"
                variant="contained"
                onClick={() => handleRemoveDependent(idx)}
              >
                Remove Spouse
              </Button>
            ) : null}
        </CardActions>
      </Card>
    </Box>
  );
};

export default DependentComponent;
