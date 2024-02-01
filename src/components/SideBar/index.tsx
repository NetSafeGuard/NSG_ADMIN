import * as C from "./style";
import Logo from "../../assets/logo.png";
import { BiCalendarEvent, BiHelpCircle } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../contextapi/global.context";
import { Tooltip } from "react-tooltip";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { UserHook } from "../../services/hooks/UserHook";
import { Loading } from "../loading";
import { MdGroups } from "react-icons/md";

export const SideBar = () => {
  const { selected, setSelected } = useContext(AuthContext);
  const { user, isLoading } = UserHook();

  if (!user || isLoading) return <Loading />;

  return (
    <C.MainContent>
      <C.Container>
        <img src={Logo} alt="Logo" />
        <C.Icons>
          <C.TopIcons>
            <Tooltip
              id="my-tooltip"
              arrowColor="#1b4c70"
              opacity={0.5}
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <C.Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Estatísticas"
              data-tooltip-variant="light"
              data-tooltip-place="right"
              menuselected={selected === "char" ? true : false}
              onClick={() => setSelected("char")}
            >
              <BiSolidBarChartSquare size={26} color={"A6ABC8"} />
            </C.Icon>
            <C.Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Grupos"
              data-tooltip-variant="light"
              data-tooltip-place="right"
              menuselected={selected === "groups" ? true : false}
              onClick={() => setSelected("groups")}
            >
              <MdGroups size={26} color={"A6ABC8"} />
            </C.Icon>
            <C.Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Atividades"
              data-tooltip-variant="light"
              data-tooltip-place="right"
              menuselected={selected === "activity" ? true : false}
              onClick={() => setSelected("activity")}
            >
              <BiCalendarEvent size={26} color={"A6ABC8"} />
            </C.Icon>
            {user.role == "ADMIN" && (
              <C.Icon
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Utilizadores"
                data-tooltip-variant="light"
                data-tooltip-place="right"
                menuselected={selected === "users" ? true : false}
                onClick={() => setSelected("users")}
              >
                <FaUserAlt size={21} color={"A6ABC8"} />
              </C.Icon>
            )}
          </C.TopIcons>
          <C.BottomIcons>
            <C.Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Configurações"
              data-tooltip-variant="light"
              data-tooltip-place="right"
              menuselected={selected === "settings" ? true : false}
              onClick={() => setSelected("settings")}
            >
              <AiFillSetting size={26} color={"A6ABC8"} />
            </C.Icon>
            <C.Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Suporte técnico"
              data-tooltip-variant="light"
              data-tooltip-place="right"
            >
              <BiHelpCircle size={26} color={"A6ABC8"} />
            </C.Icon>
          </C.BottomIcons>
        </C.Icons>
      </C.Container>
    </C.MainContent>
  );
};
