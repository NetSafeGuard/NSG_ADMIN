import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SideBar } from "../../components/SideBar";
import { Profile } from "../../components/profile";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export const DashboardPage = () => {
  const { user, isLoading, error } = UserHook();

  if (isLoading) return <Loading />;

  if (error) return <Loading text={error.message} />;

  if (!user || !user.username) return <Navigate to="/" />;

  return (
    <C.Container>
      <SideBar />
      <C.Content>
        <C.ProfileContainer>
          <Profile />
        </C.ProfileContainer>
      </C.Content>
    </C.Container>
  );
};
