import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from '../../../config/firebase';
import { collection, addDoc, doc, setDoc ,documentId,serverTimestamp,onSnapshot,where,orderBy,query} from 'firebase/firestore';
import { AppBar, Avatar, Box, Button, Divider, IconButton, LinearProgress, TextField, Toolbar, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

function Chats({useremail}){
    const {receiver}=useParams();
    const [messages,setmessages]=useState();
    const [receiverData, setReceiverData] = useState(null);

    useEffect(() => {
        const fetchReceiverData = async () => {
            try {
                const receiverQuery = query(collection(db, 'users'), where('email', '==', receiver));
                const querySnapshot = await getDocs(receiverQuery);
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    setReceiverData(userData);
                } else {
                    console.log('Receiver document does not exist');
                }
            } catch (error) {
                console.error('Error fetching receiver data:', error.message);
            }
        };

        fetchReceiverData();
        console.log(receiverData);
    }, [receiver]);

    const fetchmessages = () => {
        const senderid = useremail;
        const receiverid = receiver;
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'messages'),
                where('senderid', 'in', [senderid, receiverid]), 
            where('receiverid', 'in', [senderid, receiverid]),
            orderBy('timestamp', 'asc')
            ),
            snapshot => {
                const messageList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setmessages(messageList);
                console.log(messageList);
            }
        );
    
        return unsubscribe;
    }
    
    useEffect(() => {
        const unsubscribe = fetchmessages();
        return () => {
            unsubscribe();
        };
    }, []);

    const sendMessage =async(e)=>{
        e.preventDefault();
        const text=e.target.message.value
        const message ={
            senderid:useremail,
            receiverid:receiver,
            text,
            timestamp: serverTimestamp()
        }

        try{
            await addDoc(collection(db,"messages"),message);
            console.log("Message sent")
            fetchmessages();
            e.target.message.value=""
        }
        catch(error){
            console.error("error in adding a new message",error);
        }
    }


    useEffect(() => {
        const lastBox = document.getElementById('sendmessage_box');
        const lastBoxHeight = lastBox.offsetHeight;
        const middleBox = document.getElementById('chats_space');
        middleBox.style.paddingBottom = `${lastBoxHeight}px`;
      }, []);

      const lastMessageRef = useRef(null);

      useEffect(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);

    return(
        <Box>
        <Box>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor:'lightgreen'}}>
                    <Avatar src={receiverData?.profile}/>
                    <Typography sx={{ml:'2vw',fontWeight:'bold',color:'black'}}>{receiverData?.name || receiver}</Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <Box id="chats_space" sx={{display:'flex',flexDirection:'column',overflowY:'auto',minHeight:'80vh'}}>
            {
                (messages!=undefined || messages!=null)?(<>
                  {messages.map((m, index) => (
        <Typography
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          sx={{
            color: m.senderid === useremail ? 'white' : 'black',
            backgroundColor: m.senderid === useremail ? '#00b31b' : 'lightgrey',
            alignSelf: m.senderid === useremail ? 'flex-end' : 'flex-start',
            maxWidth: '60vw',
            padding: '1vh 2vw',
            margin: '1vh 2vw',
            borderRadius: m.senderid === useremail ? '15px 15px 0 15px' : '15px 15px 15px 0',
          }}
        >
          {m.text}
        </Typography>
      ))}
                </>):(<><LinearProgress /></>)
            }
        </Box>
        <Box id='sendmessage_box' sx={{backgroundColor:'black',padding:'2vh 0',position:'fixed',bottom:0,width:'100%'}}>
        <form onSubmit={sendMessage} style={{display:'flex',justifyContent:'space-around'}}>
            <TextField name="message"  multiline placeholder="Message" sx={{width:'80vw',margin:'0 2vw',backgroundColor:'white',borderRadius:'20px 20px',border:'none','& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: '0',
      },
      '&:hover fieldset': {
        borderColor: 'transparent', 
      },
    },}}/>
            <IconButton sx={{ color: 'white',width:'10vw',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#00b31b',borderRadius:'100px',margin:'0 2vw'}} type="submit">
            <Send fontSize="large" />
            </IconButton>
        </form>
        </Box>
        </Box>
    )
}

export default Chats;