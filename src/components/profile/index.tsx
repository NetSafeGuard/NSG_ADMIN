import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
export const Profile = () => {
  const { user, isLoading } = UserHook();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <C.Container>
      <C.Avatar src={user.avatar} alt={"asdada"} />
      <C.Column>
        <C.Username>{user.username}</C.Username>
        <C.Role>{user.role}</C.Role>
      </C.Column>
    </C.Container>
  );
};
