import { Routes, Route } from "react-router-dom";

import { LoginPage } from "@/pages/Login";
import { RecoverPage } from "@/pages/Recover";
import { DashboardPage } from "@/pages/Dashboard";
import { UsersProvider } from "@/contextapi/users.context";
import {GroupsProvider} from "@/contextapi/groups.context.tsx";
import { UpdaterPage } from "@/pages/Updater";
import { ActivityProvider } from "@/contextapi/activities.context";

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
                <ActivityProvider>
                  <DashboardPage />
                </ActivityProvider>
              </GroupsProvider>
          </UsersProvider>
        }
      />
      <Route path="/recover" element={<RecoverPage />} />
    </Routes>
  );
};
