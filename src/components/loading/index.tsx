import * as C from './style';
import {HashLoader} from 'react-spinners'

export const Loading = () => {
    return (
        <C.GlobalLoading>
            <HashLoader color='white' size={100} />
        </C.GlobalLoading>
    )
};