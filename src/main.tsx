import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PermitView from "./components/PermitView.tsx";
import Nav from "./components/Nav.tsx";
import Scanner from "./components/ScannerView.tsx";
import PWABadge from "./components/PWABadge.tsx";
import HomeView from "./components/HomeView.tsx";

const sendStartupRequest = async () => {
  try {
    const authoritiesRes = await fetch("https://e-permit.github.io/data/authorities.json");
    const authorities = await authoritiesRes.json();
    console.log("Startup data:", authorities);
    for (const [key] of Object.entries(authorities)) {
      if(authorities[key].url){
        const res = await fetch(authorities[key].url);
        await res.json();
      }
    }
  } catch (error) {
    console.error("Failed to fetch startup data:", error);
  }
};

// Call the function to send the request when the app starts
sendStartupRequest();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="h-screen w-screen flex flex-col justify-between overflow-hidden relative bg-[#e4e4e7]">
    <BrowserRouter basename="/verify">
      <div className="grow overflow-hidden absolute top-0 left-0 right-0 bottom-[5rem]">
        <Routes>
          <Route path="/" element={<HomeView />} />
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
