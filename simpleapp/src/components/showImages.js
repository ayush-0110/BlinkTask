import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowImages({showImages, setShowImages}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/getimages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const signedUrlsPromises = response.data.map(async (image) => {
          const urlResponse = await axios.get(
            `${process.env.REACT_APP_API}/images/${image.key}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return {
            ...image,
            signedUrl: urlResponse.data.url,
          };
        });
        const imagesWithSignedUrls = await Promise.all(signedUrlsPromises);
        setImages(imagesWithSignedUrls);
        console.log(imagesWithSignedUrls);
      } catch (error) {
        console.error("Could not get images", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      {showImages && (
        <div className="card1">
          <div className="cardcontent" style={{position:'relative'}}>
            <h1 className="heading" style={{ marginBottom: "3rem" }}>
              Image Portal
            </h1>
            <div className="close" onClick={()=>setShowImages(false)}>
                &times;
            </div>
            <div className="imagecontainer">
              {images.map((image) => (
                <div className="img2" key={image.key}>
                  <img src={image.signedUrl} alt={image.key} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowImages;
