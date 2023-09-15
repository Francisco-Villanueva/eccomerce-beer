import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className="loading" style={{marginTop: "10px", marginLeft: "10px", fontWeight: "normal", fontSize: "20px", fontFamily: "'Hanken Grotesk', sans-serif"}}>
      <p>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </p>
    </div>
  );
}
