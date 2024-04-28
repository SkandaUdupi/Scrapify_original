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
import ForgotPassword from "../Signupin/ForgotPassword";

import { Route , Routes , HashRouter as Router, Navigate, useNavigate,Link} from "react-router-dom";
import { useState,useEffect } from 'react';
import Editform from "../Olx/Editform";
import Chatroom from "../Olx/Chat/Chatroom";
import Chats from "../Olx/Chat/Chats";

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
  }, [useremail,setUserEmail]); 

    return (
       <div>

        
        <Router>
            <Routes>
             <Route path="/signin" element={<SignIn setUserEmail={setUserEmail}/>}/>
             <Route path="/signup" element={<SignUp/>}/>
             <Route path="/forgot-password" element={<ForgotPassword />} />
             <Route path="/" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Resell useremail={useremail}/></>}/>
             <Route path="/rates" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Scrap useremail={useremail}/></>}/>
             <Route path="/sellform" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Sell_Form useremail={useremail}/></>}/>
             <Route path="/editform" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Editform useremail={useremail}/></>}/>
             <Route path="/pickuprequests" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Pickuprequests useremail={useremail}/></>}/>
             <Route path="/pickup" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Pickup useremail={useremail}/></>}/>
             <Route path="/profile" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Profile useremail={useremail}/></>}/>
             <Route path="/myads" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Myads useremail={useremail}/></>}/>
             <Route path="/resell/:id/:showcontact?" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Itemdesc useremail={useremail}/></>}/>
             
              <Route path="/allchats" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Chatroom useremail={useremail}/></>}></Route>

              <Route path="/chat/:receiver" element={<><Navbar useremail={useremail} handleLogout={handleLogout}/><Chats useremail={useremail}/></>}></Route>

             {/* <Route path="/" element={<Condition useremail={useremail}/>}/>    */}
               
            </Routes>
        </Router>


       </div>
    )
}

export default Home;
