import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { UserContext } from "./context/userContext";

export function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <header>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  setUser(null);
                }}
              >
                Log out
              </button>
            </li>
          )}
           {!user ? (
          <li>
            <Link to="/create">Create user</Link>
          </li>):(
             <li>
             <Link to="/profile">User profile</Link>
           </li>
          )}
          {user && (
            <li>
              <Link to="/baskets">Baskets</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/createproduct">Create product</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;