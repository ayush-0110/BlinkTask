import React, { useState } from "react";
import FileUpload from "../components/fileUpload";
import ShowImages from "../components/showImages";

function MainPage() {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="main">
      {showImages ? (
        <ShowImages showImages={showImages} setShowImages={setShowImages} />
      ) : (
        <FileUpload setShowImages={setShowImages} />
      )}
    </div>
  );
}

export default MainPage;
