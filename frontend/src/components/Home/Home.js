// import React, { useState } from "react";
import Resell from "../Olx/Resellhome";
import Scrap from "../Scrap/Scrap";
import { Button } from "@mui/material";
import Itemdesc from "../Olx/Itemdesc";
import Pickup from "../Scrap/Pickup";
import VehicleForm from "../Olx/Sellform/Vehicleform";
import MobilesForm from "../Olx/Sellform/Mobilesform";
import ElectronicsForm from "../Olx/Sellform/Electronicsform";
import PropertiesForm from "../Olx/Sellform/Propertiesfrom";
import Sell_Form from "../Olx/Sell_form";

import Dashboard from "../Sidebar/Dashboard";
import Profile from "../Sidebar/Profile";
import Pickuprequests from "../Sidebar/Pickuprequests";
import Nabvar from "../Sidebar/Navbar";
import Myads from "../Olx/Myads";
import SignUp from "../Signupin/SingUp";
import SignIn from "../Signupin/SignIn";
import Navbar from "../Sidebar/Navbar";

import { Route , Routes , BrowserRouter as Router, Navigate, useNavigate,Link} from "react-router-dom";
import { useState,useEffect } from 'react';

function Condition({useremail}){
    console.log(useremail,localStorage.getItem('uid'))
    
    if(useremail!=="null" && useremail!==null && useremail!==undefined)
       return <Navigate replace to={"/resell"}/>
    else
        return <Navigate replace to={"/signin"}/>
}

function Home(){
    const storedemail = localStorage.getItem('user_email');
  const [useremail, setUserEmail] = useState(storedemail);

  const handleLogout = () => {
    localStorage.removeItem("uid");
    setUserEmail(null);
  };

  useEffect(() => {
    localStorage.setItem('user_email', useremail);    
  }, [useremail]); 

    return (
       <div>

        
        <Router>
            <Routes>
             <Route path="/signin" element={<SignIn/>}/>
             <Route path="/signup" element={<SignUp/>}/>
             <Route path="/resell" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Resell useremail={useremail}/></>}/>
             <Route path="/rates" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Scrap useremail={useremail}/></>}/>
             <Route path="/sellform" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Sell_Form useremail={useremail}/></>}/>
             <Route path="/pickuprequests" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Pickuprequests useremail={useremail}/></>}/>
             <Route path="/pickup" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Pickup useremail={useremail}/></>}/>
             <Route path="/profile" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Profile useremail={useremail}/></>}/>
             <Route path="/myads" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Myads useremail={useremail}/></>}/>
             <Route path="/resell/:id" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Itemdesc useremail={useremail}/></>}/>
             <Route path="/" element={<Condition useremail={useremail}/>}/>     
            </Routes>
        </Router>


       </div>
    )
}

export default Home;
