import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PermitView from "./components/PermitView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/permits/:qrCode",
    element: <PermitView />,
  },
],{basename:"/verify"});

ReactDOM.createRoot(document.getElementById("root")!).render(

    <div className="sm:px-2 md:px-4 px-6 sm:py-4 md:py-8 py-10">
      <RouterProvider router={router} />
    </div>

);
