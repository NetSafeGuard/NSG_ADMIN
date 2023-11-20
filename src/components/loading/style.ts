import styled from "styled-components";
import { ErrorContent } from "../error/style";

export const GlobalLoading = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 32px);
`

export const Text = styled(ErrorContent)`
    margin-top: 50px;
    font-size: 15px;
`