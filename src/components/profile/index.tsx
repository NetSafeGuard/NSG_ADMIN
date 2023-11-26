import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
import { ControlledMenu, useClick } from "@szhsin/react-menu";
import { IoMdArrowDropup } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import { Logout } from "../../global/contexts/AuthContext";

export const Profile = () => {
  const { user, isLoading } = UserHook();
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorProps = useClick(isMenuOpen, setIsMenuOpen);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const handleLogout = () => {
    setIsMenuOpen(false);
    Logout();
  }

  return (
    <C.Container>
      <C.Avatar src={user.avatar} alt={"asdada"} />
      <C.Column>
        <C.Username>{user.username}</C.Username>
        <C.Role>{user.role}</C.Role>
      </C.Column>

      <C.MenuContainer ref={ref} {...anchorProps}>
        <C.MenuIconContainer
          initial={{ rotate: 0 }}
          animate={{ rotate: isMenuOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <IoMdArrowDropup size={18} />
        </C.MenuIconContainer>
      </C.MenuContainer>

      <ControlledMenu
        state={isMenuOpen ? "open" : "closed"}
        anchorRef={ref}
        menuClassName="menuaccount"
        onClose={() => setIsMenuOpen(false)}
        align="center"
        transition
      >
        <C.MenuItem onClick={handleLogout}>
          <C.MenuText>
            <IoLogOutOutline size={18} />
            Sair
          </C.MenuText>
        </C.MenuItem>
      </ControlledMenu>
    </C.Container>
  );
};
