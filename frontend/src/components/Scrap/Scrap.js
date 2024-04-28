import React from "react";
import ScrapCategories from "./ScrapCategories";
import { Box, Container, TextField, Typography,InputAdornment,Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { useState,useEffect } from "react";
import { collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getDocs,query } from "firebase/firestore";


function Scrap(){
    const [items,setitems]=useState([])



    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categoriesCollectionRef = collection(db, "categories");
          const querySnapshot = await getDocs(query(categoriesCollectionRef));
  
          const categoriesData = querySnapshot.docs.map(doc => ({

            ...doc.data()
          }));
          console.log(categoriesData);
          setitems(categoriesData);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);
  
    
    return (
        <div >
            <Container sx={{margin:'auto'}}>
            <Box sx={{textAlign:'center'}}><Typography sx={{fontSize:{xs:"1.6rem",sm:"2.5rem",md:"3rem"},fontWeight:'bold',padding:"5px 0"}}>Today's scrap price</Typography>
            <Typography sx={{fontSize:{xs:'10px',sm:"12px",md:"14px"},padding:"5px 0"}}>Prices vary with recycling industry trends and the condition of the scrap.</Typography>
            </Box>
            {/* <Box sx={{textAlign:"center"}}><TextField id="standard-basic"  variant="standard" 
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" color="success"/>
                  </InputAdornment>
                ),
              }}
              placeholder=" Search here any item here .." sx={{fontSize:{xs:'12px',sm:"14px",md:"16px"},width:'80vw',padding:"10px 0 20px "}} /></Box> */}
            <Box margin={'5vh 0'}> 
                {
                    items.map((scrap)=>(
                        <Box sx={{marginTop:'5vh'}}>
                        <Typography sx={{color:'grey',marginBottom:'2vh',fontWeight:'bold'}}>{scrap.cat}</Typography>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{xs:1,sm:2}} columns={{xs:3,md:4,lg:5}}>
              {
                console.log(scrap.subcategories)
              }
            {scrap.subcategories.map((item)=>(
                    <Grid item xs={1}>
                        <Box sx={{border:'1px solid black' , textAlign:'center',height:'60px',padding:'10px 5px',borderRadius:'5px'}}>
                        <Typography sx={{fontSize:{xs:'14px',sm:"16px"}}}>{item.subcat}</Typography>
                        <Typography sx={{fontWeight:'bold',color:'green',fontSize:{xs:'14px',sm:"16px"}}}>&#8377; {item.subCatPrice}/{item.unit}</Typography>
                        </Box>
                </Grid>
                ))}
                 </Grid>
                </Box>
                </Box>
                    )
                    )
                }
            </Box>
            </Container>
         </div>
    )
}

export default Scrap;
