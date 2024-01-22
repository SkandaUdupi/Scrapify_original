// VehicleForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    category :  'Vehicle',
    vehicleType: 'car',
    model: '',
    year: '',
    price: '',
    fuelType: 'petrol',
    kmDriven: '',
    additionalDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFuelTypeChange = (e) => {
    setFormData((prevData) => ({ ...prevData, fuelType: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          {/* <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel> */}
          <Select
            labelId="vehicle-type-label"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          >
            <MenuItem value="car">Car</MenuItem>
            <MenuItem value="bike">Bike</MenuItem>
            <MenuItem value="scooter">Scooter</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Model" fullWidth margin="normal" name="model" value={formData.model} onChange={handleChange} />
        <TextField label="Year" fullWidth margin="normal" name="year" value={formData.year} onChange={handleChange} />
        <TextField label="Price" fullWidth margin="normal" name="price" value={formData.price} onChange={handleChange} />
        <FormControl component="fieldset" fullWidth margin="normal">
          <Typography variant="subtitle1">Fuel Type</Typography>
          <RadioGroup row name="fuelType" value={formData.fuelType} onChange={handleFuelTypeChange}>
            <FormControlLabel value="petrol" control={<Radio />} label="Petrol" />
            <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
            <FormControlLabel value="cng" control={<Radio />} label="CNG" />
            <FormControlLabel value="electric" control={<Radio />} label="Electric" />
            <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
          </RadioGroup>
        </FormControl>
        <TextField label="Km Driven" fullWidth margin="normal" name="kmDriven" value={formData.kmDriven} onChange={handleChange} />
        
        <TextField
          label="Additional Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="additionalDescription"
          value={formData.additionalDescription}
          onChange={handleChange}
        />
        <TextField label="Address" fullWidth margin="normal" name="address" value={formData.address} onChange={handleChange} />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" sx={{width:'100%',fontWeight:'bold'}}>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default VehicleForm;
