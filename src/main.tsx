import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RoutesList } from "./router/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <RoutesList />
  </BrowserRouter>
);
