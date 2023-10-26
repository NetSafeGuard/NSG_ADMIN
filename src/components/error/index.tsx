import * as C from './style';
import { BiError } from 'react-icons/bi';

type Props = {
    error: string | undefined;
}

export const Error = ({error} : Props) => {
    return (
        <C.ErrorContainer>
            <C.ErrorContent>
                {error && <BiError color={"D14444"} size={15}/>} 
                {error}
            </C.ErrorContent>
        </C.ErrorContainer>
    )
}