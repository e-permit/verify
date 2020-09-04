import React, { useEffect, useReducer, createContext } from "react";
import { set, get } from "idb-keyval";
const initialState = {
  config: {},
  changes: [],
  revocations: []
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "init":
      return { ...action.state };
    case "login":
      return { ...state, config: action.config };
    case "addChange":
      return { ...state, changes: action.change };
    case "removeChanges":
      return { ...state, changes: [] };
    default:
      return initialState;
  }
}

const AppContext = createContext({
  state: initialState,
  dispatch: () => null
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchUser() {
      let persistedState = await get("state");
      if (persistedState && Object.keys(persistedState.config) !== 0) {
        dispatch({ type: "reset", state: persistedState });
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    set("state", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
