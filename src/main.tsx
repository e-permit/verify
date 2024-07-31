import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PermitView from "./components/PermitView.tsx";
import Nav from "./components/Nav.tsx";
import Scanner from "./components/ScannerView.tsx";
import Particles from "react-tsparticles";
import PWABadge from "./PWABadge.tsx";

const sendStartupRequest = async () => {
  try {
    const response = await fetch('https://disapi.uab.gov.tr/apigateway/test/e-permit');
    const data = await response.json();
    console.log('Startup data:', data);
  } catch (error) {
    console.error('Failed to fetch startup data:', error);
  }
};

// Call the function to send the request when the app starts
sendStartupRequest();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="h-screen w-screen flex flex-col justify-between overflow-hidden">
    <BrowserRouter  basename="/verify">
      <div className="grow overflow-hidden absolute top-0 left-0 right-0 bottom-[5rem] p-0.5">
        <Routes>
          <Route path="/" element={<Particles id="tsparticles"/>} />
          <Route path="/scan" element={<Scanner />} />
          <Route path="/permits/:qrCode" element={<PermitView />} />
        </Routes>
      </div>
      <Nav />
      <PWABadge />
      {/*flex justify-center items-center h-[100px] bg-emerald-800 absolute bottom-0 left-0 right-0 */}
    </BrowserRouter>
  </div>
);
