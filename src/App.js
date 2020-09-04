import React from "react";
import { AppProvider, AppContext } from "./context";
import SelectAuthority from "./components/SelectAuthority";
import Scan from "./components/Scan";

function Page() {
  const { state } = React.useContext(AppContext);
  return (
    <React.Fragment>
      {Object.keys(state.config).length === 0 ? (
        <SelectAuthority />
      ) : (
        <Scan />
      )}
    </React.Fragment>
  );
}
function App() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

export default App;
