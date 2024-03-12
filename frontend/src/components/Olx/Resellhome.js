import { AppBar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography ,LinearProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ButtonGroup, Stack, Divider,Paper} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Dashboard from "../Sidebar/Dashboard";
import { useNavigate } from "react-router-dom";

import { db } from '../../config/firebase';
import { doc, getDocs, collection , query , orderBy , limit , startAfter,endBefore, limitToLast,where,or} from 'firebase/firestore';
import { ArrowBackIos, ArrowForwardIos, FirstPage, LastPage } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

function Resell(){
  const [items,setitems]=useState();
  const [filterkey,setfilterkey]=useState('');
  // const [searchkey,setsearchkey]=useState('');
  const pagelimit=10;
  const [pageno,setpageno]=useState(1);
  const navigate =useNavigate();
  
  const fetchInitial = async () => {
    let q;
    if(filterkey===''){
       q = query(
        collection(db, 'resellDoc'),
        orderBy('timestamp', 'desc'),
        limit(pagelimit)
      );
    }
    else{
      q = query(
        collection(db, 'resellDoc'),
        or(where('vehicleType','==',filterkey),where('electronicsType','==',filterkey),
        where('mobileType','==',filterkey),
        where('propertyType','==',filterkey)
        ),
        orderBy('timestamp', 'desc'),
        limit(pagelimit)
      );
    }
  
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    console.log(data);
    setitems(data);
  };
  

  const nextPage = async () => {
    if(items.length<pagelimit) return;
    
    const lastData = items[items.length - 1];
  
    let q;
    if(filterkey===''){
      q= query(collection(db, 'resellDoc'),
      orderBy('timestamp', 'desc'),
      startAfter(lastData['timestamp']),
      limit(pagelimit)
      );
    }
    else{
      q = query(
        collection(db, 'resellDoc'),
        or(where('vehicleType','==',filterkey),where('electronicsType','==',filterkey),
        where('mobileType','==',filterkey),
        where('propertyType','==',filterkey)
        ),
        
        orderBy('timestamp', 'desc'),
        startAfter(lastData['timestamp']),
        limit(pagelimit)
      );
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if(data.length==0)return;
    setpageno((prevpageno)=>prevpageno+1)
    console.log(data);
    setitems(data);
    console.log('next',pageno)
  };
  
  const prevPage = async () => {
    if(pageno===1) return;
    
    const firstData = items[0];
  
    let q;
    if(filterkey===''){
      q= query(collection(db, 'resellDoc'),
      orderBy('timestamp', 'desc'),
      endBefore(firstData['timestamp']),
      limit(pagelimit)
      );
    }
    else{
      q = query(
        collection(db, 'resellDoc'),
        or(where('vehicleType','==',filterkey),where('electronicsType','==',filterkey),
        where('mobileType','==',filterkey),
        where('propertyType','==',filterkey)
        ),
        
        orderBy('timestamp', 'desc'),
        endBefore(firstData['timestamp']),
        limit(pagelimit)
      );
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setpageno((prevpageno)=>prevpageno-1)
    console.log(data);
    setitems(data);
    console.log('next',pageno)
  };

  useEffect(() => {
    fetchInitial();
  }, []);

//  useEffect(() => {
//     fetchInitial();
//   }, [searchkey]);

  useEffect(()=>{
    fetchInitial();
    console.log(filterkey)
    setCategory(null)
  },[filterkey])

  const [category, setCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  };

  const StackItem = styled(Typography) ({
    padding: '2px 10px',
    textAlign: 'center',
    color: 'grey',
    fontSize:'11px',
    cursor:'pointer',
    '@media (min-width:600px)': {fontSize: '16px'},
    '@media (min-width:960px)': {fontSize: '18px'},
  });

    return (
<Box >
{/* <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static" sx={{color:'black',backgroundColor:'white',border:'none',boxShadow:'none'}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-evenly'}}>
            
            <Box sx={{textAlign:"center"}}><TextField   variant="outlined" 
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" color="primary"/>
                  </InputAdornment>
                ),
              }}
              placeholder=" Find items .." sx={{fontSize:{xs:'12px',sm:"14px",md:"16px"},width:'70vw',padding:"10px 0 20px "}} onChange={(e)=>setsearchkey(e.target.value)}/></Box>
        </Toolbar>
      </AppBar>
    </Box> */}

  <Box sx={{  backgroundColor: 'rgba(173, 216, 230, 0.2)', margin:0,p:0}}>
    <Typography sx={{padding:'2vh 2vw',fontWeight:'bold',color:'grey',fontSize:{xs:'12px',sm:'16px',md:'20px'}}}>Browse by categories </Typography> 
     <div style={{ display: 'flex', justifyContent: 'space-evenly' ,width:'100vw'}}>
  <Button sx={{ fontSize: { xs: '12px', sm: '16px', md: '20px' }, color: 'black', textTransform: 'none', borderBottom: category === 'Vehicle' ? '3px solid black' : 'none'  }} onClick={() => handleCategoryClick('Vehicle')}>Vehicle</Button>
  <Button sx={{ fontSize: { xs: '12px', sm: '16px', md: '20px' }, color: 'black', textTransform: 'none', borderBottom: category === 'Electronics' ? '3px solid black' : 'none' }} onClick={() => handleCategoryClick('Electronics')}>Electronics</Button>
  <Button sx={{ fontSize: { xs: '12px', sm: '16px', md: '20px' }, color: 'black', textTransform: 'none', borderBottom: category === 'Mobiles' ? '3px solid black' : 'none' }} onClick={() => handleCategoryClick('Mobiles')}>Mobiles</Button>
  <Button sx={{ fontSize: { xs: '12px', sm: '16px', md: '20px' }, color: 'black', textTransform: 'none', borderBottom: category === 'Properties' ? '3px solid black' : 'none' }} onClick={() => handleCategoryClick('Properties')}>Properties</Button>
</div>
      
      {category === 'Vehicle' && ( 
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{padding:'10px 10px',display:'flex',flexWrap:'wrap'}}>
          <StackItem onClick={()=>setfilterkey('car')}>Car</StackItem>
          <StackItem onClick={()=>setfilterkey('bike')}>Bike</StackItem>
          <StackItem onClick={()=>setfilterkey('scooter')}>Scooter</StackItem>
        </Stack>
        
      )}

      {category === 'Electronics' && (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{padding:'10px 10px',display:'flex',flexWrap:'wrap'}}>
          <StackItem onClick={()=>setfilterkey('TV')}>TV</StackItem>
          <StackItem onClick={()=>setfilterkey('kitchenAppliances')}>Kitchen Appliances</StackItem>
          <StackItem onClick={()=>setfilterkey('computerLaptops')}>Computer Laptops</StackItem>
          <StackItem onClick={()=>setfilterkey('fridge')}>Fridge</StackItem>
          <StackItem onClick={()=>setfilterkey('AC')}>AC</StackItem>
          <StackItem onClick={()=>setfilterkey('washingMachine')}>Washing Machine</StackItem>
        </Stack>
      )}

      {category === 'Mobiles' && (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{padding:'10px 10px',display:'flex',flexWrap:'wrap'}}>
          <StackItem onClick={()=>setfilterkey('phones')}>Phones</StackItem>
          <StackItem onClick={()=>setfilterkey('tabs')}>Tabs</StackItem>
        </Stack>
        
      )}

      {category === 'Properties' && (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{padding:'10px 10px',display:'flex',flexWrap:'wrap'}}>
          <StackItem onClick={()=>setfilterkey('house')}>House/Apartments</StackItem>
          <StackItem onClick={()=>setfilterkey('landPlot')}>Land/Plots</StackItem>
        </Stack>
      )}

    </Box>

{
  (items!=='undefined' && items!=undefined)?(
    <Box sx={{paddingBottom:'20px'}}><Box margin={'20px 0px'} sx={{width:'100vw'}}>
      {
        (filterkey=='') && (<Box><Typography sx={{margin:'10px 15px',fontWeight:'bold',fontSize: { xs: '14px', sm: '16px', md: '20px' }}}>Fresh recomendations</Typography><br /></Box>)
      }
    <Grid container spacing={{ xs: 1, sm: 2 }} columns={{xs:2,sm:3,md:4}}>
  {items.map(item => (
    <Grid item xs={1} key={item.id} onClick={() => navigate(`/resell/${item.id}`)} sx={{ m:0,p:0 }}>
      <Card sx={{ maxWidth: 345 }} id="grid_card">
        <CardActionArea>
          <CardMedia
            component="img"
            height='160'
            image={item.images[0]}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent sx={{ height: '96px' }}>
            <Typography gutterBottom variant="h6" component="div" fontWeight={'bold'}>
              &#8377; {item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
              {item.category === 'Properties' ? `${item.propertyType} for ${item.transactionType}` : item.model}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ alignItems: 'center', justifyItems: 'center', display: 'flex', mt: '10px' }}>
              <LocationOnIcon fontSize="small" />
              {item.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))}
</Grid>

    </Box>

{
  (items.length!==0)?(
    <Box sx={{display:'flex',justifyContent:'center',mt:'600px',position:'fixed',bottom:0,width:'97vw'}}>
            <Button sx={{margin:'0 1vw'}} startIcon={<ArrowBackIos/>} variant="contained" onClick={prevPage}>Prev</Button>
            <Button sx={{margin:'0 1vw'}} endIcon={<ArrowForwardIos/>} variant="contained" onClick={nextPage}>Next</Button>
      </Box>
    // <Typography>Hello</Typography>
      ):(
        <Box><Typography sx={{textAlign:'center',marginTop:'5vh'}}>Apologies, but we currently don't have any data available for this category.</Typography></Box>
      )
}
      </Box>
  ):
  (
    <LinearProgress />
  )
}
  


<Box sx={{ position: 'sticky', bottom: 5,  textAlign: 'center' }}>
  {/* <Button
  sx={{
    border: '5px solid #3498db',
    borderRadius: '15px',
    color: '#ffffff',
    backgroundColor: '#7fb3d5',
    fontWeight: 'bolder',
    width: { xs: '100px', sm: '140px', md: '160px' },
    height: { xs: '50px', sm: '60px', md: '70px' },
  }}
>
        <Typography fontWeight="bold" fontSize="large">
          &#43;
        </Typography>
        &nbsp; SELL
      </Button> */}
    </Box>

</Box>
    )
}

export default Resell;