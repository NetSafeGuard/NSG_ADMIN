import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RoutesList } from "./router/routes";
import "./global/global.css";
import { AuthProvider } from "./contextapi/global.context";
import { NoContextMenu } from "./components/nocontext";
import "react-notifications-component/dist/theme.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-loading-skeleton/dist/skeleton.css";
import { TitleBar } from "./components/titlebar";
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <TitleBar />
    <BrowserRouter>
      <AuthProvider>
        <NoContextMenu />
        <Toaster />
        <RoutesList />
      </AuthProvider>
    </BrowserRouter>
  </>
);
