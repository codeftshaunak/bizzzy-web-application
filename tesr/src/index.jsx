import React from "react";
import ReactDOMClient from "react-dom/client";
import { ClientDashboard } from "./screens/ClientDashboard";
import ClientDashboardViewJobPost from "./screens/ClientDashboard/ClientDashboardOverview";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(
  <>
    <ClientDashboard />
  </>
);
