import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography ,Pagination} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Dashboard from "../Sidebar/Dashboard";
import { useNavigate } from "react-router-dom";

function Resell(){

  const navigate =useNavigate();

    return (
<div>
<Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" sx={{color:'black',backgroundColor:'white',border:'none',boxShadow:'none'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-evenly'}}>
            
            <Box sx={{textAlign:"center"}}><TextField   variant="outlined" 
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" color="primary"/>
                  </InputAdornment>
                ),
              }}
              placeholder=" Find items .." sx={{fontSize:{xs:'12px',sm:"14px",md:"16px"},width:'70vw',padding:"10px 0 20px "}} /></Box>
<TuneIcon/>
            {/* <SortIcon/> */}
        </Toolbar>
      </AppBar>
    </Box>

    <Box margin={'20px 5px'}>
    <Grid container spacing={{xs:1,sm:2}} columns={{xs:2,sm:3,md:4}}>
        {
            Array.from({ length: 10 }, (_, index) => index + 1)
            .map(number => (
                <Grid item xs={1} onClick={()=>navigate(`/resell/${number}`)}>
                  <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <CardMedia
  component="img"
  height='160'
  image="https://tiimg.tistatic.com/fp/1/007/574/vivo-mobile-phone-7-38mm-ultra-smooth-body-170g-light-2-5d-adjusted-outline-for-a-great-hold-703.jpg"
  alt="green iguana"
  sx={{ objectFit: 'contain' }}
/>
<FavoriteIcon fontSize="small" sx={{position:'absolute',top:5,right:5,color:'white'}}/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
          &#8377; 10000
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{textOverflow:'ellipsis',overflow:'hidden',width:'100%',whiteSpace:'nowrap'}}>
            Vivo phone 
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{alignItems:'center',justifyItems:'center',display:'flex',mt:'10px'}}><LocationOnIcon fontSize="small" />location</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                </Grid>
            ))        
            }
            </Grid>
    </Box>


    <Box sx={{display:'flex',justifyContent:'center',m:'5vh 0'}}><Pagination count={10} color="primary" /></Box>
    


<Box sx={{ position: 'sticky', bottom: 5,  textAlign: 'center' }}>
  {/* <Button
  sx={{
    border: '5px solid #3498db',
    borderRadius: '15px',
    color: '#ffffff',
    backgroundColor: '#7fb3d5',
    fontWeight: 'bolder',
    width: { xs: '100px', sm: '140px', md: '160px' },
    height: { xs: '50px', sm: '60px', md: '70px' },
  }}
>
        <Typography fontWeight="bold" fontSize="large">
          &#43;
        </Typography>
        &nbsp; SELL
      </Button> */}
    </Box>

</div>
    )
}

export default Resell;
