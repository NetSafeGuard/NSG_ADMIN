import * as C from './style';
import {HashLoader} from 'react-spinners';
import { BiError } from 'react-icons/bi';

interface LoadingProps {
    text?: string;
};

export const Loading = ({text} : LoadingProps) => {
    return (
        <C.GlobalLoading>
            <HashLoader color='white' size={100} />
            {text && 

                <C.Text>
                    <BiError size={20} color={"#CE524D"} />
                    {text}
                </C.Text>
            
            }
        </C.GlobalLoading>
    )
};