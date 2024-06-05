import * as C from "./style";
import { ClockLoader, PacmanLoader } from "react-spinners";
import { TypeAnimation } from 'react-type-animation';
import {
    checkUpdate,
    installUpdate
} from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UpdateState {
    version: string | undefined
    date: string | undefined
    body: string | undefined
}

export const UpdaterPage = () => {


    const [update, setUpdate] = useState({} as UpdateState);
    const navigate = useNavigate();

    useEffect(() => {

        const updater = async () => {

            try {
                const { shouldUpdate, manifest } = await checkUpdate()
                if (shouldUpdate) {
                    setUpdate({
                        version: manifest?.version,
                        date: manifest?.date,
                        body: manifest?.body
                    })
                
                    await installUpdate()
                    await relaunch()
                }
                else {
                    navigate("/login")
                }
            } catch (error) {
                console.error(error)
            }
        }

        setTimeout(() => {
            updater()
        }, 2000)
    }, [])

    return (
        <C.Container>

            {!update.version && (
                <>
                    <ClockLoader color="#015593" size={80} />
                    <C.UpdateText>A procurar por atualizações <TypeAnimation
                            cursor={false}
                            sequence={['.',1000, '..', 1000, '...', 1000]}
                            wrapper="h1"
                            repeat={Number.POSITIVE_INFINITY}
                            speed={90}
                        />
                    </C.UpdateText>
                </>
            )}

            {update.version && (
                <>
                    <PacmanLoader color="#015593" size={25} />
                    <C.UpdateText>Atualização encontrada! </C.UpdateText>
                    <C.UpdateVersion>Versão: {update.version}</C.UpdateVersion>
                    <C.UpdateVersion>Notas de lançamento: {update.body}</C.UpdateVersion>

                    <C.UpdateSubText>A instalar <TypeAnimation
                            cursor={false}
                            sequence={['.',1000, '..', 1000, '...', 1000]}
                            wrapper="h2"
                            repeat={Number.POSITIVE_INFINITY}
                            speed={90}
                        />
                    </C.UpdateSubText>
                </>
            )}
        </C.Container>
    )
}