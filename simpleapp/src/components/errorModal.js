import React from "react";

function ErrorModal({ setErrorMessage, errorMessage }) {
  return (
    <div className="modal">
      <div className="errorBox">
        <h1>Warning!</h1>
        <p className="error">
          {errorMessage}
        </p>
        <button
          className="btn btn-alert"
          style={{ marginTop: "1rem" }}
          onClick={() => {
            setErrorMessage(false);
          }}
        >
          {" "}
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
