import { Download } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";


function Pickuprequests(){

    const pickups = [
        { pickupid: 1, date: '2022-01-15', totalPrice: 150, scrapsSold: [{ item: 'Paper', quantity: 10 }, { item: 'Metal', quantity: 5 }] },
        { pickupid: 2, date: '2022-02-01', totalPrice: 200, scrapsSold: [{ item: 'Plastic', quantity: 15 }, { item: 'Glass', quantity: 10 }] },
        { pickupid: 3, date: '2022-03-10', totalPrice: 180, scrapsSold: [{ item: 'Cardboard', quantity: 8 }, { item: 'Aluminum', quantity: 10 }] },
      ];
      
      
    return(
        <>
        <Box>
            
            {
                (pickups.length!=0) ? (<>
                <Box sx={{margin:'5vh',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography fontWeight={'bolder'}>Your pickup requests</Typography>
                {pickups.map((pick)=>(
                        <Box sx={{width:'70vw',minheight:{xs:'140px',sm:'160px'},border:'0.8px solid grey',borderRadius:'5px',mt:'4vh',padding:'2vh 5vw',backgroundColor:'rgba(200, 200, 200, 0.07)'
                        }}>

                            <Box display={'flex'} justifyContent={'space-between'} mb={'1vh'}>

                                <Typography color={'grey'}>{pick.date}</Typography>
                                <Typography color={'grey'}>Id: {pick.pickupid}</Typography>
                            </Box>
                            
                            <Typography color={'rgb(11, 225, 44)'} fontWeight={'bolder'} fontSize={'20px'}>&#8377;&nbsp;{pick.totalPrice}</Typography>
                            <Divider sx={{margin:'2vh 0'}}/>
                         
                            
  <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
    {pick.scrapsSold.map((scrap) => (
        <li style={{padding:'0 1vw',borderRight:'1px solid rgb(11, 225, 44)'}}>{scrap.item}</li>
    ))}
  </ul>

                  <Box sx={{display:'flex',justifyContent:'end',marginTop:'2vh'}}>
                    <Button sx={{fontWeight:'bold',backgroundColor:'rgba(73, 159, 242, 0.8)',color:'white'}} startIcon={<Download/>}>Bill</Button>
                    </Box>         
                        </Box>
                    ))}
                </Box>
                </>) :(<>
                <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',marginTop:'25vh'}}>
                    <Typography width={'60vw'}>You have not raised any request till now</Typography>
                    <Button sx={{textTransform:'none',color:'white',fontWeight:'bolder',backgroundColor:'rgb(11, 225, 44)',padding:'10px',margin:'5vh 0'}}>Raise pickup request</Button>
                </Box>
                </>)
            }
        </Box>
        </>
    )
}

export default Pickuprequests;