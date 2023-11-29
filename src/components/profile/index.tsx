import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
import { ControlledMenu, useClick } from "@szhsin/react-menu";
import { IoMdArrowDropup } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useState, useRef } from "react";
import { Logout } from "../../global/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Skeleton from 'react-loading-skeleton';

export const Profile = () => {
  const { user, isLoading } = UserHook();
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorProps = useClick(isMenuOpen, setIsMenuOpen);

  if(isLoading) return <div className="flex items-center">
    <div className="flex flex-row ">
      <Skeleton count={1} circle={true} width={40} height={40}/>
      <div className="flex flex-col">
        <Skeleton count={1} width={100} height={20}/>
        <Skeleton count={1} width={100} height={20}/>
      </div>
    </div>
  </div>

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <C.MenuItem>
              <C.MenuText>
                <IoLogOutOutline size={18} />
                Sair
              </C.MenuText>
            </C.MenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem realmente a certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação fará com que você seja desconectado da sua conta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ControlledMenu>
    </C.Container>
  );
};
