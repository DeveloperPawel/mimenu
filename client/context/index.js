import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

const initialState = {
  user: null,
};

const Context = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  React.useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
