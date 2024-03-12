import { Box, Button, IconButton, ImageList, ImageListItem, Typography, CircularProgress, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AddPhotoAlternate, Camera, Delete } from "@mui/icons-material";
import Webcamera from "../Olx/Sellform/Webcam";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { Icon } from "leaflet";

//
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { imgDB } from "../../config/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { deleteObject } from "firebase/storage";

function Pickup() {

  const [pdate, setpdate] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [imageflag, setimageflag] = useState('close');
  const [addressLine1, setAddressLine1] = useState(""); // State variable for address line 1
  const [addressLine2, setAddressLine2] = useState(""); // State variable for address line 2
  const [pincode, setPincode] = useState("");


  const handleDeleteimage = (index) => {
    setImagesArray((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(position)
    });
  }, []);

  const customIcon = new Icon({
    iconUrl: require("./marker.webp"),
    iconSize: [30, 30],
  });

  const handleSubmit = async () => {
    const email = localStorage.getItem('user_email');
    try {
      // Upload images to Firebase Storage...
      const promises = imagesArray.map(async (image) => {
        const imgRef = ref(imgDB, `Imgs_pick/${v4()}`);
        const imageData = await fetch(image).then((res) => res.blob());
        await uploadBytes(imgRef, imageData);
        const downloadURL = await getDownloadURL(imgRef);
        console.log("Download URL:", downloadURL);
        return downloadURL;
      });

      const downloadURLs = await Promise.all(promises);
      console.log("All URLs:", downloadURLs);

      // Construct address object
      const address = {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        pincode: pincode
      };

      // Construct pickup data object
      const pickupData = {
        email : email,
        date: pdate,
        images: downloadURLs,
        address: address
      };

      // Store pickup data in Firestore
      await addDoc(collection(db, "pickupDoc"), pickupData);
      
      // Handle successful submission
      console.log("Pickup confirmed!");
      console.log(pickupData)
    } catch (error) {
      console.error("Error submitting pickup:", error);
    }
  };

  return (
    <div>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '5vh 0', textAlign: 'center' }}>

        <Box sx={{ m: '3vh 0', border: '1px solid grey', borderRadius: '5px', width: { xs: "90vw", sm: "70vw" } }}>
          <Box>
            <Typography sx={{ mb: '1vh', height: '5vh', backgroundColor: 'rgba(144, 238, 144, 0.8);', fontWeight: 'bolder', fontSize: { xs: '14px', sm: '16px' }, p: '1vh 0' }}>Select date</Typography>
          </Box>
          <Box sx={{ m: '2vh 0' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DatePicker
                disablePast
                dateFormat="dd/MM/yyyy"
                isClearable
                onChange={(date) => setpdate(`${date.$D}/${date.$M + 1}/${date.$y}`)}
              />

            </LocalizationProvider>
            <br />
            <Typography sx={{ mt: '2vh', color: 'grey' }}>Our pickup team will call one hour before their arrival </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            m: "3vh 0",
            border: "1px solid grey",
            borderRadius: "5px",
            width: { xs: "90vw", sm: "70vw" },
          }}
        >
          <Box>
            <Typography
              sx={{
                mb: "1vh",
                height: "5vh",
                backgroundColor: "rgba(144, 238, 144, 0.8);",
                fontWeight: "bolder",
                fontSize: { xs: "14px", sm: "16px" },
                p: "1vh 0",
              }}
            >
              Enter address
            </Typography>
          </Box>
          <Box sx={{ m: "2vh 0" }}>
            <TextField label="Address line 1" sx={{ width: '80%', marginBottom: '2vh' }} value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}/>
            <TextField label="Address line 2" sx={{ width: '80%', marginBottom: '2vh' }} value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}/>
            <TextField label="Pincode" sx={{ width: '80%', marginBottom: '2vh' }} value={pincode}
          onChange={(e) => setPincode(e.target.value)}/>
          </Box>
          {/*---------------------Map box below --------------------------------------------------- */}
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              height: { xs: "260px", sm: "320px" },
            }}
          >
            {
              (latitude != '' && longitude != '') ? (<MapContainer center={[latitude, longitude]} zoom={20}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  style={{ pointerEvents: 'none' }}
                />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                  <Popup>A</Popup>
                </Marker>
              </MapContainer>) : (<><CircularProgress /><Typography>fetching current location</Typography></>)
            }
          </Box>
        </Box>

        <Box sx={{ m: '3vh 0', border: '1px solid grey', borderRadius: '5px', width: { xs: "90vw", sm: "70vw" } }}>
          <Box><Typography sx={{ mb: '1vh', height: '5vh', backgroundColor: 'rgba(144, 238, 144, 0.8);', fontWeight: 'bolder', fontSize: { xs: '14px', sm: '16px' }, p: '0vh 0' }}>Upload images</Typography></Box>
          <Box sx={{ m: '0vh 0' }}>
            <Box sx={{ border: '1px solid black' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button sx={{ display: 'flex', alignItems: 'center' }} onClick={() => setimageflag('select')}> <AddPhotoAlternate />Add photo</Button>
                <Button sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} onClick={() => setimageflag('click')}><Camera />Click a photo</Button>
              </Box>

              <Webcamera imageflag={imageflag} imagesArray={imagesArray} setImagesArray={setImagesArray} setimageflag={setimageflag} />

              <Box>
                <ImageList sx={{ width: '100%' }} cols={2} rowHeight={180}>
                  {imagesArray.map((image, index) => (
                    <ImageListItem sx={{ margin: '1px', border: '0.2px solid black' }} key={index}>
                      <img src={image} alt={'image'} loading="lazy" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                      <IconButton sx={{ position: 'absolute', top: 0, right: 0, borderRadius: '20px', color: 'white', backgroundColor: 'red' }} onClick={() => handleDeleteimage(index)}>
                        <Delete fontSize="small" />
                      </IconButton>

                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Box>

          </Box>
        </Box>

        <Button sx={{ width: '70vw', backgroundColor: 'rgba(0,128,0,0.8)', height: '5vh', color: 'white', fontWeight: 'bold', m: '3vh 0' }} onClick={handleSubmit}>Confirm pickup</Button>
      </Box>
    </div>
  )
}

export default Pickup;