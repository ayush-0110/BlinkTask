import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function FileUpload({setShowImages}) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError("");
    setSuccessMsg("");
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const presignResponse = await axios.get(
        `${process.env.REACT_APP_API}/generate-presigned-url`,
        {
          params: {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { signedRequest, url } = presignResponse.data;

      await axios.put(signedRequest, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      setSuccessMsg("File uploaded successfully! File URL: " + url);
      console.log("File uploaded successfully! File URL: " + url)
      toast.success("File uploaded successfully! ", {
        autoClose: 5000,
      });

    } catch (error) {
      setError("File upload failed. Please try again.");
      toast.error("File upload failed. Please try again.", {
        autoClose: 5000,
      });
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div style={{margin:'1rem', fontWeight:'500'}}>
          {/* <h2>File Details:</h2> */}
          <p>File Name: &nbsp; {selectedFile.name}</p>
          <p>File Type: &nbsp; {selectedFile.type}</p>
          <p>Last Modified: {new Date(selectedFile.lastModified).toDateString()}</p>
        </div>
      );
    }
  };
  if (isLoading) {
    return (
      <div className="main">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="card1">
      <div className="cardcontent">
        <h1 className="heading">Image Portal</h1>
        <div>
          {/* <input type="file" onChange={onFileChange} /> */}
          <input
            type="file"
            id="file"
            onChange={onFileChange}
            className="fileInput"
          />
          <label htmlFor="file" className="btn">
            Choose a file
          </label>
          <button className="btn" onClick={onFileUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          
          {fileData()}
        </div>
        <div>
            <button className="btn" style={{backgroundColor:'#007bff', border:'none'}} onClick={()=>setShowImages(true)}>View All Images</button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
