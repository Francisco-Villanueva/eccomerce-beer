import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../commons/Cards/Loading";
import { VerifiedUser } from "@mui/icons-material";
import Navbar from "../commons/Navbar";
export default function HistoryCart() {
  const { user, history } = useContext(AuthContext);
  console.log(history);
  function formatearFecha(fecha) {
    // Convierte la cadena de fecha en un objeto Date
    const fechaObjeto = new Date(fecha);

    // Obtiene el día, mes y año
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1; // ¡Recuerda que los meses en JavaScript son indexados en base 0!
    const año = fechaObjeto.getFullYear();

    // Formatea la fecha en DD/MM/YYYY
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${año}`;

    return fechaFormateada;
  }
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          height: "90vh",
          // background: "#fff",
          verticalAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          margin: "20px auto",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "20px" }}>HISTORY</h1>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "space-between",
            // background: "#fff",
            height: "100%",
          }}
        >
          {history.length > 0 ? (
            history.map((m) => (
              <div
                style={{
                  background: "#fff",
                  padding: "1em",
                  borderRadius: "10px",
                  width: "40%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>{formatearFecha(m.cart.date)}</h3>
                  <b style={{ display: "flex", alignItems: "center" }}>
                    <VerifiedUser sx={{ m: 0, p: 0 }} /> | {user.username}
                  </b>
                </div>
                <hr />
                <h3>Libros:</h3>
                {m.booksData.map((b) => (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr 1fr",
                      alignItems: "center",
                      gap: "30px",
                    }}
                  >
                    <img
                      src={b.image}
                      alt={b.title}
                      style={{
                        objectFit: "contain",
                        width: "40px",
                        borderRadius: "100%",
                      }}
                    />
                    <p>- {b.title}</p>
                    <b>${b.price}</b>
                  </div>
                ))}

                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>TOTAL</h1>
                  <b>$ {m.cart.price}</b>
                </div>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
