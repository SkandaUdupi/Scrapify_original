import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, setDoc ,documentId,serverTimestamp,onSnapshot,where,orderBy,query,limit,or} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Avatar, Box, Divider, LinearProgress, Typography } from "@mui/material";
import { getDocs } from "firebase/firestore";

function Chatroom({useremail}){
    const navigate=useNavigate();

    function handleSubmit(idd){
        navigate(`/chat/${idd}`)
    }

    const [messages,setmessages]=useState();/////
    const [userdata,setuserdata]=useState([]);
    const fetchconversation = () => {
        const senderid = useremail;
        // console.log(senderid)
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'messages'),
                or(where('senderid', '==', senderid),
                where('receiverid', '==', senderid)),
            orderBy('timestamp', 'desc'),
            ),

            snapshot => {
                const lastmessages=[];
                const uniqueids=[];
                const messageList = snapshot.docs.forEach(doc => {
                    const uid = doc.data().senderid === senderid ? doc.data().receiverid : doc.data().senderid
                    if(!uniqueids.includes(uid)){
                        lastmessages.push(doc.data());
                        uniqueids.push(uid)
                    }
                    else{
                        return false;
                    }
                });
                setmessages(lastmessages);
                console.log(lastmessages);
            }
        );
    
        return unsubscribe;
    }
    //////
    const fetchReceiverData = async (idd) => {
        try {
            const receiverQuery = query(collection(db, 'users'), where('email', '==', idd));
            const querySnapshot = await getDocs(receiverQuery);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                return userData;
                // setuserdata(userData)

            } else {
                console.log('Receiver document does not exist');
                return null;
            }
        } catch (error) {
            console.error('Error fetching receiver data:', error.message);
            return null;
        }
    };
    
    useEffect(() => {
        const unsubscribe = fetchconversation();
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(()=>{
        
           if(messages){
            messages.map((m) =>  {
                const idd = m.senderid === useremail ? m.receiverid : m.senderid;
                fetchReceiverData(idd).then((data) => {
                    setuserdata((prevData)=>[ ...prevData, data ]);
                });
            })
           }
        
    },[messages,useremail])

    return(
        <>
        <Typography sx={{fontSize:{xs:'20px',sm:'28px',md:'32px'},padding:'2vh 2vw',color:'#00b31b'}}>All Chats </Typography>
        <Divider/>
        {
            (messages && messages.length==userdata.length)?(<Box>
                {
                    (messages.length!==0)?(
                    <Box>
                 {
                        messages.map((m,index) =>  {
                            const idd = m.senderid === useremail ? m.receiverid : m.senderid;
                            const person=userdata[index];
                            // console.log(userdata[index])
                            return (
                                <Box sx={{ display: 'flex', padding: '2vh 0', borderBottom: '0.1px solid black', backgroundColor: 'rgba(0, 179, 27, 0.1)' ,alignItems:'center'}} 
                                onClick={()=>handleSubmit(idd)}>
                                    <Avatar src={person.profile} sx={{ margin: '0 3vw' ,height:{xs:'40px',sm:'60px',md:'80px'},width:{xs:'40px',sm:'60px',md:'80px'}}} /> {/* set profile image source here obj.profile */}
                                    <Box>
                                        <Typography sx={{fontWeight:'bold',fontSize:{xs:'14px',sm:'20px',md:'24px'}}}>{person.name}</Typography> {/* set name fetched  obj.name*/}
                                        <Typography sx={{color:'grey',fontSize:{xs:'12px',sm:'16px',md:'18px'}}}>{m.text}</Typography>
                                    </Box>
                                </Box>
                            );
                            
                        })
                    }
                    </Box>):(<Box><Typography sx={{fontSize:{xs:'12px',sm:'16px',md:'18px'},padding:'2vh 2vw'}}>You dont have any conversations with any one !!</Typography></Box>)
                }
            </Box>):(<LinearProgress />)
        }
        </>
    )
}


export default Chatroom;