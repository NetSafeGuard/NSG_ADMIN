import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SideBar } from "../../components/SideBar";
import { Profile } from "../../components/profile";
import { useContext } from "react";
import { AuthContext } from "../../global/contexts/AuthContext";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { EstatisticasPage } from "./subpages/estatisticas";

export const DashboardPage = () => {
  const { user, isLoading, error } = UserHook();
  const { selected } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (error) return <Loading text={error.message} />;

  if (!user || !user.username) return <Navigate to="/" />;

  return (
    <C.Container>
      <SideBar />
      <C.Content>
        <C.Row>
          <C.ProfileContainer>
            <Profile />
          </C.ProfileContainer>
        </C.Row>
        {selected === "char" && <EstatisticasPage />}
      </C.Content>
    </C.Container>
  );
};
