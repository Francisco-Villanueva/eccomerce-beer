import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../../contexts/AdminContext";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const { allUsers, switchAdmin } = React.useContext(AdminContext);
  const { user } = React.useContext(AuthContext);

  const handleAdmin = (id) => {
    switchAdmin(id);
  };
  const nav = useNavigate();

  const userToShow = allUsers.filter((e) => e.id !== user.id);

  console.log({ allUsers, userToShow });

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <TableContainer component={Paper} sx={{ width: "90%", padding: "1em" }}>
        <button onClick={() => nav("/home")}>
          <ArrowBack />
        </button>
        <h1>All users</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Admin</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userToShow &&
              userToShow.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">
                    {row.isAdmin ? "true" : "false"}{" "}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => handleAdmin(row.id)}>switch</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
