import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "../Sidebar/Dashboard";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

function Navbar({useremail,handleLogout}){
    const [toggledash,settoggledash]=useState(false);
    const navigate=useNavigate();
  const handleCloseDash = () => {
    settoggledash(false);
  };
return(
    <>
    <AppBar position="sticky" sx={{backgroundColor:'white',color:'black',border:'none',top:0}} id="scrapify_navbar">
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
        {(useremail!=="null" && useremail!==null && useremail!==undefined) ? (<></>) :(<Button onClick={()=>navigate("/signin")}>Login</Button>) }
        </Toolbar>
      </AppBar></>
)
}

export default Navbar;