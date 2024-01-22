import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Home,
  LocalShipping,
  Logout,
  Person,
  Favorite,
  CurrencyRupee,
  Sell,
  Recycling
} from "@mui/icons-material";
const Dashboard = ({onClose,useremail,handleLogout}) => {

  const dashboardRef = useRef();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    
      <Box ref={dashboardRef} flex={1}  sx={{width:'210px',height:'100vh',backgroundColor:'rgba(216, 255, 224, 1)' ,position:'fixed',top:0,left:0 ,zIndex:'10',color:'#333333'}} >
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            secondary={<React.Fragment>{"Welcome"}</React.Fragment>}
            primary="Name"
          />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}

        <ListItem disablePadding>
          <ListItemButton component="a" href="/profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <Divider/>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/resell">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/myads">
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="My Ads" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/sellform">
            <ListItemIcon>
              <Sell />
            </ListItemIcon>
            <ListItemText primary="Resell" />
          </ListItemButton>
        </ListItem>

        <Divider/>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/pickup">
            <ListItemIcon>
            {/* <Recycling />  */}
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="Schedule Pickup" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/pickuprequests">
            <ListItemIcon>
            <Recycling />
              {/* <LocalShipping /> */}
            </ListItemIcon>
            <ListItemText primary="Pickup requests" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="/rates">
            <ListItemIcon>
              <CurrencyRupee />
            </ListItemIcon>
            <ListItemText primary="Check rates" />
          </ListItemButton>
        </ListItem>

        <Divider/>
        
        <ListItem disablePadding>
          <ListItemButton component="a" href="/signin" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>

       
      </List>
    </Box>
    
  );
};

export default Dashboard;

