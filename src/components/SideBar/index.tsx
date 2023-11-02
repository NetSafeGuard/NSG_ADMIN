import * as C from './style';
import Logo from '../../assets/logo.png';
import { PiHouse } from 'react-icons/pi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiCalendarEvent, BiHelpCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '../../global/contexts/AuthContext';

export const SideBar = () => {
    const { selected, setSelected } = useContext(AuthContext);

    return (
        <C.Container>
            <img src={Logo} alt="Logo" />
            <C.Icons>
                <C.TopIcons>
                    <C.Icon 
                        menuselected={selected === "home" ? true : false}
                        onClick={() => setSelected("home")}
                    >
                        <PiHouse size={23} color={"91A4B7"} />
                    </C.Icon>
                    <C.Icon
                        menuselected={selected === "calendar" ? true : false}
                        onClick={() => setSelected("calendar")}
                    >
                        <AiOutlineCalendar size={23} color={"91A4B7"} />
                    </C.Icon>
                    <C.Icon
                        menuselected={selected === "events" ? true : false}
                        onClick={() => setSelected("events")}
                    >
                        <BiCalendarEvent size={23} color={"91A4B7"} />
                    </C.Icon>
                    <C.Icon
                        menuselected={selected === "users" ? true : false}
                        onClick={() => setSelected("users")}
                    >
                        <AiOutlineUser size={23} color={"91A4B7"} />
                    </C.Icon>
                </C.TopIcons>
                <C.BottomIcons>
                    <C.Icon
                        menuselected={selected === "settings" ? true : false}
                        onClick={() => setSelected("settings")}
                    >
                        <FiSettings size={23} color={"91A4B7"} />
                    </C.Icon>
                    <C.Icon
                    >
                        <BiHelpCircle size={23} color={"91A4B7"} />
                    </C.Icon>
                </C.BottomIcons>
            </C.Icons>
        </C.Container>
    )

}