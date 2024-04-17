import { Routes, Route } from "react-router-dom";

import { LoginPage } from "@/pages/Login";
import { RecoverPage } from "@/pages/Recover";
import { DashboardPage } from "@/pages/Dashboard";
import { UsersProvider } from "@/contextapi/users.context";
import {GroupsProvider} from "@/contextapi/groups.context.tsx";
import { UpdaterPage } from "@/pages/Updater";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<UpdaterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <UsersProvider>
              <GroupsProvider>
                  <DashboardPage />
              </GroupsProvider>
          </UsersProvider>
        }
      />
      <Route path="/recover" element={<RecoverPage />} />
    </Routes>
  );
};
