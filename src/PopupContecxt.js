import { createContext, useState } from "react";

const popupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isActivePopup, setIsActivePopup] = useState(false);

    const [action, setAction] = useState("")
    const activePopup = (bool) => {
        setIsActivePopup(bool);
    }

    const changeAction = (newAction) => {
        setAction(newAction)
    }
    return (
        <popupContext.Provider value={{
            isActivePopup,
            action,
            activePopup,
            changeAction,
        }}>
            {children}
        </popupContext.Provider>
    )
}

export default popupContext;