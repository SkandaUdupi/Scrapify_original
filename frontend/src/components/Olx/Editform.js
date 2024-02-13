import React from "react";
import VehicleForm from './Sellform/Vehicleform';
import ElectronicsForm from './Sellform/Electronicsform';
import MobilesForm from './Sellform/Mobilesform';
import PropertiesForm from './Sellform/Propertiesfrom';
import { useLocation } from "react-router-dom";

function Editform({useremail}){
    const location = useLocation();
  const formData = location.state ? location.state.formData : null;

//   console.log(formData)

    if(formData.category=='Vehicle')
    return (<VehicleForm flag={'edit'} editdata={formData}/>)
    else if(formData.category=='Properties')
    return (<PropertiesForm flag={'edit'} editdata={formData}/>)
    else if(formData.category=='Mobiles')
    return (<MobilesForm flag={'edit'} editdata={formData}/>)
    else
    return (<ElectronicsForm flag={'edit'} editdata={formData}/>)
    
}

export default Editform;    