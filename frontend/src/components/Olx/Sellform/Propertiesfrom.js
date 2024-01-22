// PropertiesForm.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const PropertiesForm = () => {
  const [formData, setFormData] = useState({
    propertyType: 'house', 
    transactionType: 'sale', 
    price:'',
    plotArea: '',
    lengthBreadth: '',
    floors: '',
    rooms: '',
    address: '',
    landmark: '',
    additionalDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePropertyTypeChange = (e) => {
    setFormData((prevData) => ({ ...prevData, propertyType: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Property Type</FormLabel>
          <RadioGroup row name="propertyType" value={formData.propertyType} onChange={handlePropertyTypeChange}>
            <FormControlLabel value="house" control={<Radio />} label="House" />
            <FormControlLabel value="landPlot" control={<Radio />} label="Land/Plot" />
          </RadioGroup>
        </FormControl>
        <TextField label="Price" fullWidth margin="normal" name="price" value={formData.price} onChange={handleChange} />
        {formData.propertyType === 'house' ? (
          <>
            <FormControl fullWidth margin="normal">
              {/* <InputLabel id="transaction-type-label">Transaction Type</InputLabel> */}
              <Select
                labelId="transaction-type-label"
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
              >
                <MenuItem value="sale">Sale</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Plot Area" fullWidth margin="normal" name="plotArea" value={formData.plotArea} onChange={handleChange} />
            
            <TextField label="Floors" fullWidth margin="normal" name="floors" value={formData.floors} onChange={handleChange} />
            <TextField label="Rooms" fullWidth margin="normal" name="rooms" value={formData.rooms} onChange={handleChange} />
          </>
        ) : (
          <>
            <TextField label="Plot Area" fullWidth margin="normal" name="plotArea" value={formData.plotArea} onChange={handleChange} />
            <TextField
              label="Length x Breadth"
              fullWidth
              margin="normal"
              name="lengthBreadth"
              value={formData.lengthBreadth}
              onChange={handleChange}
            />
          </>
        )}
        
        <TextField label="Address" fullWidth margin="normal" name="address" value={formData.address} onChange={handleChange} />
        <TextField label="Landmark Nearby" fullWidth margin="normal" name="landmark" value={formData.landmark} onChange={handleChange} />
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
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" sx={{width:'100%',fontWeight:'bold'}}>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PropertiesForm;
