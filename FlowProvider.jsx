//https://github.com/FranciscoMendes10866/soav/tree/master/src <---where I got this idea from
import React, { createContext, useReducer } from "react";

import flowReducer from "./flowReducer";
import flowInitialState from "./flowInitialState";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [flowState, flowDispatch] = useReducer(
    flowReducer,
    flowInitialState
  );
  return (
    <GlobalContext.Provider
      value={{
        flowState,
        flowDispatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};