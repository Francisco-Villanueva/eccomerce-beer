// ACA CREAMOS EL SERVER
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { validateUser } = require("./src/middleware/auth");
const db = require("./src/db/db");
const cors = require("cors");
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  // Agrega otras opciones de configuración si es necesario.
};
app.use(cors(corsOptions));
// Express Route File Requires
const routes = require("./src/routes");

app.use(express.json());
app.use(cookieParser());

// Express Routing
app.use("/", routes);
// app.get("/api/secret", validateUser);

db.sync({ force: true }).then(() => {
  app.listen(4000, () => {
    console.log(`Server listening at port ${4000}`);
  });
});
