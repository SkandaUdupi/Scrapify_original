// MobilesForm.jsx
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
} from '@mui/material';

const MobilesForm = () => {
  const [formData, setFormData] = useState({
    category:'Mobiles',
    mobileType: '',
    model: '',
    price: '',
    specifications: '',
    purchaseDate: '',
    additionalDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          <InputLabel id="mobile-type-label">Mobile Type</InputLabel>
          <Select
            labelId="mobile-type-label"
            name="mobileType"
            value={formData.mobileType}
            onChange={handleChange}
          >
            <MenuItem value="phones">Phones</MenuItem>
            <MenuItem value="tabs">Tabs</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Model" fullWidth margin="normal" name="model" value={formData.model} onChange={handleChange} />
        <TextField label="Price" fullWidth margin="normal" name="price" value={formData.price} onChange={handleChange} />
        <TextField
          label="Month & Year of Purchase"
          fullWidth
          margin="normal"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
        />
        <TextField
          label="Specifications"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
        />
       
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
          <Button type="submit" variant="contained" color="primary"  sx={{width:'100%',fontWeight:'bold'}}>
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default MobilesForm;
