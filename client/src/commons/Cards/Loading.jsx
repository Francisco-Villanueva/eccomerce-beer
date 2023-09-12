import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return <div className="loading">
    <p><FontAwesomeIcon icon={faSpinner} spin size="1.9x"/>  Loading...</p>
    </div>;
}
