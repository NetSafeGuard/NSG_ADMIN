import * as C from './style';
import Logo from '../../assets/logo.png';
import { PiHouse } from 'react-icons/pi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiCalendarEvent, BiHelpCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '../../global/contexts/AuthContext';
import { Tooltip } from 'react-tooltip';

export const SideBar = () => {
    const { selected, setSelected } = useContext(AuthContext);

    return (
        <C.Container>
            <img src={Logo} alt="Logo" />
            <C.Icons>
                <C.TopIcons>
                    <Tooltip id="my-tooltip" arrowColor='#17B4BB' opacity={0.5} style={{backgroundColor: '#FFFFFF'}}/>
                    <C.Icon 
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Ínicio"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                        menuselected={selected === "home" ? true : false}
                        onClick={() => setSelected("home")}
                    >
                        <PiHouse size={26} color={"CCCCCC"} />
                    </C.Icon>
                    <C.Icon
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Caléndario"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                        menuselected={selected === "calendar" ? true : false}
                        onClick={() => setSelected("calendar")}
                    >
                        <AiOutlineCalendar size={26} color={"CCCCCC"} />
                    </C.Icon>
                    <C.Icon
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Evento"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                        menuselected={selected === "events" ? true : false}
                        onClick={() => setSelected("events")}
                    >
                        <BiCalendarEvent size={26} color={"CCCCCC"} />
                    </C.Icon>
                    <C.Icon
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Utilizadores"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                        menuselected={selected === "users" ? true : false}
                        onClick={() => setSelected("users")}
                    >
                        <AiOutlineUser size={26} color={"CCCCCC"} />
                    </C.Icon>
                </C.TopIcons>
                <C.BottomIcons>
                    <C.Icon
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Configurações"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                        menuselected={selected === "settings" ? true : false}
                        onClick={() => setSelected("settings")}
                    >
                        <FiSettings size={25} color={"CCCCCC"} />
                    </C.Icon>
                    <C.Icon
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Suporte técnico"
                        data-tooltip-variant='light'
                        data-tooltip-place="right"
                    >
                        <BiHelpCircle size={25} color={"CCCCCC"} />
                    </C.Icon>
                </C.BottomIcons>
            </C.Icons>
        </C.Container>
    )

}