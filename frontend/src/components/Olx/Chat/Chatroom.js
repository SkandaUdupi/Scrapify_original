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

    //     async (snapshot) => {
    //         const lastMessages = [];
    //         snapshot.docs.forEach(async (doc) => {
    //             const messageData = doc.data();
    //             const receiverId = messageData.receiverId;
    //             const receiverData = await fetchReceiverData(receiverId);
    //             lastMessages.push({
    //                 ...messageData,
    //                 receiverEmail: receiverData.email,
    //                 receiverProfilePhoto: receiverData.profilePhoto
    //             });
    //             setMessages(lastMessages);
    //         });
    //     }
    // );
    
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
            } else {
                console.log('Receiver document does not exist');
                return null;
            }
        } catch (error) {
            console.error('Error fetching receiver data:', error.message);
            return null;
        }
    };
    ///////

    // const fetchReceiverData = async (receiverId) => {
    //     try {
    //         const receiverDoc = await getDocs(collection(db, 'users'), where('userId', '==', receiverId));
    //         if (!receiverDoc.empty) {
    //             return receiverDoc.docs[0].data();
    //         } else {
    //             console.log('Receiver document does not exist');
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error fetching receiver data:', error.message);
    //         return null;
    //     }
    // };
    
    useEffect(() => {
        const unsubscribe = fetchconversation();
        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <>
        {/* <form onSubmit={(event)=>handleSubmit(event)}>
            <input type="text" placeholder="email" name="receiver" />
            <button>Go</button>
        </form>
        <hr />
        All Chats
        <hr /> */}
        <Typography sx={{fontSize:{xs:'20px',sm:'28px',md:'32px'},padding:'2vh 2vw',color:'#00b31b'}}>All Chats </Typography>
        <Divider/>
        {
            (messages)?(<Box>
                {
                    (messages.length!==0)?(<Box>
                 {
                        messages.map((m) => {
                            const idd = m.senderid === useremail ? m.receiverid : m.senderid;
                            //fetch name and profile image of the user using idd 
                            const userData =fetchReceiverData(idd);
                            console.log(userData);
                            return (
                                <Box sx={{ display: 'flex', padding: '2vh 0', borderBottom: '0.1px solid black', backgroundColor: 'rgba(0, 179, 27, 0.1)' ,alignItems:'center'}} 
                                onClick={()=>handleSubmit(idd)}>
                                    <Avatar src="null" sx={{ margin: '0 3vw' ,height:{xs:'40px',sm:'60px',md:'80px'},width:{xs:'40px',sm:'60px',md:'80px'}}} /> {/* set profile image source here */}
                                    <Box>
                                        <Typography sx={{fontWeight:'bold',fontSize:{xs:'14px',sm:'20px',md:'24px'}}}>{m.receiverEmail}</Typography> {/* set name fetched  */}
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

// return (
//     <>
//         <Typography sx={{ fontSize: { xs: '20px', sm: '28px', md: '32px' }, padding: '2vh 2vw', color: '#00b31b' }}>All Chats </Typography>
//         <Divider />
//         {
//             messages.length !== 0 ? (
//                 <Box>
//                     {
//                         messages.map((message, index) => (
//                             <Box key={index} sx={{ display: 'flex', padding: '2vh 0', borderBottom: '0.1px solid black', backgroundColor: 'rgba(0, 179, 27, 0.1)', alignItems: 'center' }}
//                                 onClick={() => handleSubmit(message.receiverId)}>
//                                 <Avatar src={message.receiverProfilePhoto} sx={{ margin: '0 3vw', height: { xs: '40px', sm: '60px', md: '80px' }, width: { xs: '40px', sm: '60px', md: '80px' } }} />
//                                 <Box>
//                                     <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '14px', sm: '20px', md: '24px' } }}>{message.receiverEmail}</Typography>
//                                     <Typography sx={{ color: 'grey', fontSize: { xs: '12px', sm: '16px', md: '18px' } }}>{message.text}</Typography>
//                                 </Box>
//                             </Box>
//                         ))
//                     }
//                 </Box>
//             ) : (
//                 <Box>
//                     <Typography sx={{ fontSize: { xs: '12px', sm: '16px', md: '18px' }, padding: '2vh 2vw' }}>You don't have any conversations with anyone!!</Typography>
//                 </Box>
//             )
//         }
//     </>
// )
// }

export default Chatroom;