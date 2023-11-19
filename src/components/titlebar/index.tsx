import * as C from './style';
import close from '../../assets/close.png';
import maximize from '../../assets/maximize.png';
import minimize from '../../assets/minimize.png';
import { appWindow } from '@tauri-apps/api/window';

export const TitleBar = () => {
    return (
        <C.TitleBarContainer data-tauri-drag-region>
            <div>
                <C.TitleBarTitle>NetSafeGuard</C.TitleBarTitle>
            </div>

            <C.ButtonContainer>
                <C.Button
                    onClick={async () => await appWindow.minimize()}
                >
                    <img src={minimize} alt="close" />
                </C.Button>
                <C.Button
                    onClick={async () => {
                        const maximize = await appWindow.isMaximized()
                        if(!maximize) {
                            await appWindow.maximize()
                        }
                        else {
                            await appWindow.unmaximize()
                        }
                    }}
                >
                    <img src={maximize} alt="close" />
                </C.Button>
                <C.Button
                    onClick={async () => await appWindow.close()}
                >
                    <img src={close} alt="close" />
                </C.Button>
            </C.ButtonContainer>
        </C.TitleBarContainer>
    )
}