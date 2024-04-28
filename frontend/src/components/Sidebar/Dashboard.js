import React, { useEffect, useRef , useState} from "react";
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
  Login,
  Logout,
  Person,
  Favorite,
  CurrencyRupee,
  Sell,
  Recycling,
  Chat
} from "@mui/icons-material";
import { collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getDocs,query,where } from "firebase/firestore";
const Dashboard = ({onClose,useremail,handleLogout}) => {
  const [customerInfo, setCustomerInfo] = useState({});

  const dashboardRef = useRef();
  const logkey = (useremail == null || useremail == undefined || useremail == undefined || useremail=='null') ? false : true;
  console.log(logkey,"logkey",useremail)
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

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(usersCollectionRef, where("email", "==", useremail))
        );
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setCustomerInfo(doc.data());

          });
        } else {
          console.log("No matching user found!");
        }
       
      } catch (err) {
        console.error("Error fetching user document:", err);
      }
    };

    fetchCustomerId();
  }, [useremail]);
  return (
    
      <Box ref={dashboardRef} flex={1}  sx={{width:'210px',height:'100vh',backgroundColor:'rgba(216, 255, 224, 1)' ,position:'fixed',top:0,left:0 ,zIndex:'10',color:'#333333'}} >
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={customerInfo.name} src={customerInfo.name} />
          </ListItemAvatar>
          <ListItemText
            secondary={<React.Fragment>{"Welcome"}</React.Fragment>}
            primary={customerInfo.name}
          />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/profile":"/signin"}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <Divider/>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/":"/signin"}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/myads":"/signin"}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="My Ads" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/sellform":"/signin"}>
            <ListItemIcon>
              <Sell />
            </ListItemIcon>
            <ListItemText primary="Resell" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/allchats":"/signin"}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItemButton>
        </ListItem>

        <Divider/>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/pickup":"/signin"}>
            <ListItemIcon>
            {/* <Recycling />  */}
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="Schedule Pickup" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/pickuprequests":"/signin"}>
            <ListItemIcon>
            <Recycling />
              {/* <LocalShipping /> */}
            </ListItemIcon>
            <ListItemText primary="Pickup requests" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href={logkey?"/rates":"/signin"}>
            <ListItemIcon>
              <CurrencyRupee />
            </ListItemIcon>
            <ListItemText primary="Check rates" />
          </ListItemButton>
        </ListItem>

        <Divider/>
        
       {
        (logkey)?( <ListItem disablePadding>
          <ListItemButton component="a" href="/signin" onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>):( <ListItem disablePadding>
          <ListItemButton component="a" href="/signin">
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary="Log In" />
          </ListItemButton>
        </ListItem>)
       }

       
      </List>
    </Box>
    
  );
};

export default Dashboard;

