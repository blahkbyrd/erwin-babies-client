import { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import popupContext from '../PopupContecxt';

import PopUpFormValidation from "./forms/PopUpFormValidation";

function UserSettings() {
    /*------- context ------*/
    const { activePopup, changeAction, isActivePopup } = useContext(popupContext)

    
    const navigate = useNavigate();

    const createAlbum = () => {
        navigate('/tableau-de-bord')
    }
    const updateUserInfo = () => {
        alert("Non disponible pour le moment")
    }
    const contactAdmin = () => {
        navigate('/a-propos')
    }
    const deleteAccount = () => {
        console.log("delete account");
        activePopup(true);
        changeAction("delete-account")
    }


    return (
        <div className='grid user-settings'>
            <button onClick={createAlbum} className='grid-button'>créer un album</button>
            <button onClick={updateUserInfo} className='grid-button'>modifier mes infos <span>(bientôt disponible)</span></button>
            <button onClick={contactAdmin} className='grid-button'>contacter un admin</button>
            <button onClick={deleteAccount} className='grid-button'>supprimer mon compte</button>
            {
                isActivePopup && <PopUpFormValidation elemToDelete="" />
            }
        </div>
    );
}

export default UserSettings;