import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RoutesList } from "./router/routes";
import './global/global.css';
import { AuthProvider } from "./global/contexts/AuthContext";
import { ReactNotifications } from "react-notifications-component";
import { NoContextMenu } from "./components/nocontext";
import 'react-notifications-component/dist/theme.css'
import 'react-tooltip/dist/react-tooltip.css';
import { TitleBar } from "./components/titlebar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <TitleBar/>
    <BrowserRouter>
      <AuthProvider>
        <NoContextMenu />
        <ReactNotifications />
        <RoutesList />
      </AuthProvider>
    </BrowserRouter>
  </>
);
