import * as C from './style';
import { BiError } from 'react-icons/bi';

type Props = {
    error: string | undefined;
}

export const Error = ({error} : Props) => {
    return (
        <C.ErrorContainer>
            <C.ErrorContent>
                {error}
            </C.ErrorContent>
        </C.ErrorContainer>
    )
}