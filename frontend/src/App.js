import React, { useMemo, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import { UserContext } from "./component/context/userContext";

function App() {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser , basket, setBasket}), [user, setUser, basket, setBasket]);

  return (
    <div>
      <UserContext.Provider value={providerValue}>
        <Header />
        <Main />
      </UserContext.Provider>
    </div>
  );
}

export default App;
