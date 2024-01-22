import React, { useState } from 'react';
import {
  Button,
  Box,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import VehicleForm from './Sellform/Vehicleform';
import ElectronicsForm from './Sellform/Electronicsform';
import MobilesForm from './Sellform/Mobilesform';
import PropertiesForm from './Sellform/Propertiesfrom';
import { DirectionsCar, House, Smartphone, Tv } from '@mui/icons-material';

const Sell_Form = () => {
  const [selectedCategory, setSelectedCategory] = useState('vehicle');

  const handleCategoryToggle = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box maxWidth="sm" sx={{margin:'2vh auto'}}>
        <Typography textAlign={'center'} margin={'2vh 0'} fontWeight={'bolder'}>What are you offering ??</Typography>
        <Typography> ** photo upload section has to be done </Typography>
         <Grid container justifyContent="center" mt={2} spacing={1} mb={4}>
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedCategory === 'vehicle' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryToggle('vehicle')}
            sx={{ width: '100%'  }}
          >
            <DirectionsCar />
            &nbsp; Vehicle
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedCategory === 'electronics' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryToggle('electronics')}
            sx={{ width: '100%' }}
          >
            <Tv />
            &nbsp; Electronics
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedCategory === 'mobiles' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryToggle('mobiles')}
            sx={{ width: '100%' }}
          >
            <Smartphone />
            &nbsp; Mobiles
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedCategory === 'properties' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryToggle('properties')}
            sx={{ width: '100%' }}
          >
            <House />
            &nbsp; Properties
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{margin:'2vh 0'}}/>
      {selectedCategory === 'vehicle' && <VehicleForm flag={'save'}/>}
      {selectedCategory === 'electronics' && <ElectronicsForm flag={'save'}/>}
      {selectedCategory === 'mobiles' && <MobilesForm flag={'save'}/>}
      {selectedCategory === 'properties' && <PropertiesForm flag={'save'}/>}
    </Box>
  );
};

export default Sell_Form;