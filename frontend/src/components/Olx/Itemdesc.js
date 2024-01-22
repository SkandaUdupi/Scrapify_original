import { AppBar, Avatar, Box, Button, Card, Container, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect,useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Itemdesc(){
  const imagePaths = [
    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  ];

  const desc=['desc1','desc2','map these descriptions']  // map these descriptions
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
      
      </Box>

      <Box sx={{m:'5vh 0'}}>
      <Swiper
      modules={[Navigation, Pagination]}
      navigation={!isMobile}
      pagination={{ clickable: true }}
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      
    >
      {
        imagePaths.map((ipath)=>(
          <SwiperSlide><Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,border:'none'}}>
            <img src={ipath} alt="error" style={{ width:'auto', height: 'auto', objectFit: 'cover' }}/></Card></SwiperSlide>
        ))
      }
    </Swiper>
      </Box>

      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>

        <Box sx={{border:'1px solid lightgrey',mt:'4vh', borderRadius:'10px',padding:'3vh 5vw',width:'70vw'}}>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Typography sx={{fontWeight:'bold',fontSize:{xs:'24px',sm:"30px"},m:'1vh 0'}}>price</Typography>
          <FavoriteIcon/>   {/*   on press add to wishlist  */}
          </Box>
          <Typography sx={{fontSize:{xs:'16px',sm:"18px"}}}>name</Typography>
          <Divider sx={{backgroundColor:'lightblue',m:'1vh 0'}}/>
          <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},justifyContent:'space-between'}}>
          <Typography sx={{fontSize:{xs:'14px',sm:"16px"}}}>place</Typography>
          <Typography sx={{fontSize:{xs:'14px',sm:"16px"}}}>posted date</Typography>
          </Box>
        </Box>

        <Box sx={{border:'1px solid lightgrey', mt:'4vh',borderRadius:'10px',padding:'2vh 5vw',width:'70vw'}}>
        <Typography sx={{fontSize:{xs:'16px',sm:"18px"},fontWeight:'bold'}}>Description</Typography>
        <Divider sx={{backgroundColor:'lightblue',m:'1vh 0'}}/>
        {      
        desc.map((d)=>(
          <Typography sx={{fontSize:{xs:'14px',sm:"16px"}}}>{d}</Typography>
        ))
        }
        </Box>

        <Box sx={{border:'1px solid lightgrey', m:'4vh 0',borderRadius:'10px',padding:'2vh 5vw',width:'70vw'}}>
          <Box sx={{display:'flex',alignItems:'center'}}><Avatar /><Typography sx={{fontSize:{xs:'16px',sm:"18px"},fontWeight:'bold',ml:'5vw'}}>seller name</Typography></Box>
          <Box sx={{display:'flex',alignContent:'center',justifyContent:'center',mt:'3vh'}}>
            <Button sx={{border:'2px solid black',borderRadius:'5px',width:'80vw',fontWeight:'bold',color:'black'}}>Chat with seller</Button></Box>
        </Box>

      </Box>
        </div>
    )
}

export default Itemdesc;