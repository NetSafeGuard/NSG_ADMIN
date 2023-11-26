import * as C from "./style";
import { MdOutlineEventAvailable } from "react-icons/md";

interface CardProps {
    title: string
    value: string
}

export const Card = ({title,value} : CardProps) => {

    console.log(title,value)
    return (
        <C.Container>
            <C.Row>
                <C.Rounded>
                    <MdOutlineEventAvailable size={25} color='white' />
                </C.Rounded>
            </C.Row>
        </C.Container>
    )	
}