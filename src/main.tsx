import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RoutesList } from "./router/routes";
import './global/global.css';
import { AuthProvider } from "./global/contexts/authcontext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <RoutesList />
    </AuthProvider>
  </BrowserRouter>
);
