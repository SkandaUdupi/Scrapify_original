import React from "react";
import { useState,useEffect } from "react";
import { collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getDocs } from "firebase/firestore";


function Myads(){
    const [itemData, setItemData] = useState([]);
    const userEmail = localStorage.getItem("user_email");    
    useEffect(() => {
        const fetchItemData = async (userEmail) => {
            const itemsCollection = collection(db, 'resellDoc');
          
            try {
              const querySnapshot = await getDocs(itemsCollection);
          
              const itemDataArray = [];
              
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.useremail === userEmail) {
                  itemDataArray.push({
                    id: doc.id,
                    ...data
                  });
                }
              });    
              setItemData(itemDataArray);
            } catch (error) {
              console.error('Error fetching item data:', error);
              return [];
            }
          };
        ////////////////////
        fetchItemData(userEmail);
      }, [userEmail]);

      useEffect(() => {
        console.log('Item Data Array:', itemData);
      }, [itemData]);

    return(
        <>Under process</>
    )
}

export default Myads;