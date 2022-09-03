import { useContext, useEffect, useState } from 'react';
import popupContext from '../PopupContecxt';
import UpdateForm from './forms/UpdateForm';

function Popup(props) {

    // CONTEXT CONSTANT
    const { activePopup, action } = useContext(popupContext)
    const [formToDisplay, setFormToDisplay] = useState("")
    // LOCALSTORAGE
    const elemToDelete = JSON.parse(localStorage.getItem("elem-id"));

    useEffect(() => {
        switch (action) {
            case "delete-album":
                setFormToDisplay('delete album')
                console.log("delete album");
                break;
            case "delete-com":
                setFormToDisplay("delete comment");
                break;
            case "update-album":
                setFormToDisplay("update album");
                break;
            case "update-com":
                setFormToDisplay("update comment");
                break;
            default:
                break;
        }
    }, [])

    return (
        <dialog className="form validation-popup">
            <div onClick={() => { activePopup(false) }} className="close-button">X</div>
            {
                formToDisplay === "delete album" || formToDisplay ==="delete comment"
                    ? <p>delete form</p> : <UpdateForm/>
            }
        </dialog>
    );
}

export default Popup;

//yTGch7qD7EPzwpn