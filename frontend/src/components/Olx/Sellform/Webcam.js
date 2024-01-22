import { Button, Dialog, DialogContent } from '@mui/material';
import React, { useCallback, useEffect,useRef,useState } from 'react';
import Webcam from 'react-webcam';

function Webcamera({ imageflag, imagesArray, setImagesArray ,setimageflag}) {
    const fileInputRef = useRef(null);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
  
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setImagesArray((prevImages) => [...prevImages, imageSrc]);
      setimageflag(null)
    }, [webcamRef, setImagesArray]);
  
    const handleUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const uploadedImageSrc = reader.result;
          setImagesArray((prevImages) => [...prevImages, uploadedImageSrc]);
        };
        reader.readAsDataURL(file);
      }
      setimageflag(null);
    };
  
    useEffect(() => {
        if (imageflag === 'select') {
          fileInputRef.current.click(); 
        }
      }, [imageflag]);

    if (imageflag === 'click') {
      return (
        <>
           <Dialog open={true}  fullWidth maxWidth="sm">
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Webcam height={600} width={600} ref={webcamRef} />
        <Button onClick={capture}>Capture photo</Button>
      </DialogContent>
    </Dialog>
        </>
      );
    } else if (imageflag === 'select') {
      return (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {}
        </>
      );
    } else {
      return <></>;
    }
  }
  

export default Webcamera;