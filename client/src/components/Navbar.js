import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const loginUser = () => {
    // navigate(`/login`);
  };

  const logoutUser = () => {
    // axios
    //   .post("/logout")
    //   .then(() => {
    //     toggleAuth(null);
    //     // navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("Error en el logout:", error);
    //   });
  };

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
  }, [isAuthenticated]);

  return (
    <nav>
      <div>
        <p>
          {isAuthenticated ? `Welcome ${user.name}!!!` : "You are logged out!"}
        </p>
        <button onClick={() => (isAuthenticated ? logoutUser() : loginUser())}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
      {!isAuthenticated && (
        <div>
          <p>Not a User?</p>
          <Link to="/register">
            <button>REGISTER!</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
