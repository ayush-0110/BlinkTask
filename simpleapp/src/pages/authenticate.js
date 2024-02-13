import React, { useState } from "react";
import Register from "../components/register";
import Login from "../components/login";

function AuthenticatePage() {
  const [register, setRegister] = useState(false);
  return (
    <div className="main">
      {register ? <Register setRegister={setRegister} /> : <Login setRegister={setRegister} />}
    </div>
  );
}

export default AuthenticatePage;
