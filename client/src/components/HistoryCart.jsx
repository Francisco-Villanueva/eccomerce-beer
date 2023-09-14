import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../commons/Cards/Loading";
export default function HistoryCart() {
  const { user, history } = useContext(AuthContext);
  console.log(history);

  return (
    <div>
      <h1>Historial</h1>
      {history.length > 0 ? (
        history.map((m) => <h1>HISTORAIAL </h1>)
      ) : (
        <Loading />
      )}
    </div>
  );
}
