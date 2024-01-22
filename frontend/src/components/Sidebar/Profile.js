import { CloudUpload } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dialog1({open1,handleClose}){
    return (
        <Dialog open={open1} onClose={handleClose}>
          <DialogTitle>Edit Image and Name</DialogTitle>
          <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <input
          accept="image/*"
          id="contained-button-file"
          type="file"
        //   onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="contained-button-file" >
          <IconButton component="span" >
            <Avatar sx={{width:{xs:'100px',sm:'200px'},height:{xs:'100px',sm:'200px'}}}>
              <CloudUpload />
            </Avatar>
          </IconButton>
        </label>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              fullWidth
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      );
}

function Dialog2({open2,handleClose}){
    return (
        <Dialog open={open2} onClose={handleClose}>
          <DialogTitle>Edit mobile and email</DialogTitle>
          <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          
            <TextField
              margin="dense"
              id="name"
              label="Mobile number"
              fullWidth
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Email address"
              fullWidth
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    )
}

function Profile(){
  // const navigate = useNavigate();
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleClose = () => {
    setopen1(false);
    setopen2(false);
  };

  useEffect(() => {
    // Get UID from local storage
    const uid = localStorage.getItem('uid');
      
    if (uid) {
      const getUserData = async () => {
        try {
          const userDocRef = doc(db,'users',uid);
          //
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(userData);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }

        //   getDoc(userDocRef)
        //   .then((doc)=>{
        //     console.log(doc.data().email);
        //     // const userData = doc.data();
        //     setUserData(doc.data());
        //   })
        
        // } catch (error) {
        //   console.error('Error fetching user data:', error.message);
        // }
      };

      getUserData();
    } else {
      console.log('User UID not found in local storage');
    }
    // console.log(userData)
  }, []);
    return(
        <>
        <Box sx={{width:{xs:'90vw',sm:'80vw',md:'60vw'},margin:'5vh auto'}}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'5vh 0'}}><Avatar sx={{width:{xs:'150px',sm:'250px'},height:'auto'}}></Avatar>
                <Typography sx={{m:'2vh 0',fontSize:{xs:'18px',sm:'24px'}}}>{userData ? userData.name : 'Loading...'}</Typography>
                <Button sx={{color:'green',fontWeight:'bold',textTransform:'none' ,'&:hover': { backgroundColor: 'transparent' } }} disableRipple onClick={()=>setopen1(true)}>Change</Button>
            </Box>
            <Dialog1 open1={open1} handleClose={handleClose}/>
            <Dialog2 open2={open2} handleClose={handleClose}/>
            <Divider/>
            <Box mt={'4vh'}>
                <Box sx={{display:'flex',justifyContent:'space-between',margin:'2vh 0'}}>
                    <Box><Typography sx={{color:'grey'}}>Mobile number</Typography>
                    <Typography>{userData ? userData.phone : 'Loading...'}</Typography>
                    </Box>
                    <Button sx={{color:'green',fontWeight:'bold',textTransform:'none' ,'&:hover': { backgroundColor: 'transparent' } }} disableRipple onClick={()=>setopen2(true)}>Change</Button>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',margin:'2vh 0'}}>
                    <Box><Typography sx={{color:'grey'}}>Email address</Typography>
                    <Typography>{userData ? userData.email : 'Loading...'}</Typography>
                    </Box>
                    <Button sx={{color:'green',fontWeight:'bold',textTransform:'none' ,'&:hover': { backgroundColor: 'transparent' } }} disableRipple onClick={()=>setopen2(true)}>Change</Button>
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default Profile;