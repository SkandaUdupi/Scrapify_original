import { Box, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Pickup(){


const [pdate,setpdate]=useState(null);

    return (
        <div>

            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',m:'5vh 0',textAlign:'center'}}>

            <Box sx={{ m: '3vh 0', border: '1px solid grey', borderRadius: '5px', width: '70vw' }}>
        <Box>
          <Typography sx={{mb:'1vh',height:'5vh',backgroundColor:'rgba(144, 238, 144, 0.8);',fontWeight:'bolder',fontSize:{xs:'14px',sm:'16px'},p:'1vh 0'}}>Select date</Typography>
        </Box>
        <Box sx={{m:'2vh 0'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      
        <DatePicker  
        disablePast
        dateFormat="dd/MM/yyyy"
        isClearable
        onChange={(date)=>setpdate(`${date.$D}/${date.$M+1}/${date.$y}`)}
        />
      
    </LocalizationProvider>
        </Box>
      </Box>

      {/* <Box sx={{ m: '5vh 0', border: '1px solid grey', borderRadius: '5px', width: '70vw' }}>
        <Box>
        <Typography>Select time</Typography>
        </Box>
        <Box>selecting time</Box>
      </Box> */}

      <Box sx={{ m: '3vh 0', border: '1px solid grey', borderRadius: '5px', width: '70vw' }}>
        <Box><Typography sx={{mb:'1vh',height:'5vh',backgroundColor:'rgba(144, 238, 144, 0.8);',fontWeight:'bolder',fontSize:{xs:'14px',sm:'16px'},p:'1vh 0'}}>Select address</Typography></Box>
        <Box sx={{m:'2vh 0'}}>selecting address from map , manually enter address</Box>
      </Box>

      <Box sx={{ m: '3vh 0', border: '1px solid grey', borderRadius: '5px', width: '70vw' }}>
        <Box><Typography sx={{mb:'1vh',height:'5vh',backgroundColor:'rgba(144, 238, 144, 0.8);',fontWeight:'bolder',fontSize:{xs:'14px',sm:'16px'},p:'1vh 0'}}>Upload images</Typography></Box>
         <Box sx={{m:'2vh 0'}}>section to upload images</Box>
      </Box>

      <Button sx={{width:'70vw',backgroundColor:'rgba(0,128,0,0.8)',height:'5vh',color:'white',fontWeight:'bold',m:'3vh 0'}}>Confirm pickup</Button>
            </Box>
        </div>
    )
}

export default Pickup;