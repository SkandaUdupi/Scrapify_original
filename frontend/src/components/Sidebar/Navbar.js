import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../Sidebar/Dashboard";
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({useremail,handleLogout}){
    const [toggledash,settoggledash]=useState(false);
  
  const handleCloseDash = () => {
    settoggledash(false);
  };
return(
    <>
    <AppBar position="static" sx={{backgroundColor:'white',color:'black',border:'none'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={()=>settoggledash(!toggledash)}/>
            {toggledash && <Dashboard onClose={handleCloseDash} useremail={useremail} handleLogout={handleLogout}/>}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color:'green',fontWeight:'bold',fontFamily: 'Montserrat, sans-serif'}}>
            Scrapify
          </Typography>
        
        </Toolbar>
      </AppBar></>
)
}

export default Navbar;