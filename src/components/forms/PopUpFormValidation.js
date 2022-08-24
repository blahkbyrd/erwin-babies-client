import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import popupContext from '../../PopupContecxt';

import { uncommentAlbum, updateComment, reset } from '../../features/commentSlice';
import { deleteAlbum } from "../../features/albumSlice";
import MessageToUser from '../MessageToUser';
import { deleteAccount, logout } from '../../features/usersSlice';
import { useNavigate } from 'react-router-dom';


function PopUpFormValidation(props) {

    /* CONSTANTS */
    const navigate = useNavigate()

    // CONTEXT CONSTANT
    const { activePopup, action } = useContext(popupContext)

    // state
    const [isDeleted, setIsDeleted] = useState(false);
    const [popupContent, setPopupContent] = useState("regular");

    // LOCALSTORAGE
    const elemToDelete = JSON.parse(localStorage.getItem("comment-id"));
    const albumToDelete = JSON.parse(localStorage.getItem("album-id"))
    const userToDelete = JSON.parse(localStorage.getItem("user"));

    //DOM ELEMENTS CONTENT
    const buttonYes = elementContent(action, "button");
    const question = elementContent(action, "question")
    const [deleteComm, setDeletecomm] = useState('')
    const [isActive, setIsActive] = useState(false);
    const [confirmation, setConfirmation] = useState("")

    // FORM
    const [formData, setFormdata] = useState("");

    // REDUX CONSTANT
    const dispatch = useDispatch();
    const { commentValue, commentSuccess } = useSelector((state) => state.comment)
    const { albumData } = useSelector((state) => state.album);
    const { status, message } = useSelector(state => state.user);
    /* EVENTS */

    // DELETE/UPDATE 
    const onSubmit = (e) => {
        e.preventDefault();
        switch (action) {
            case "delete-com":
                dispatch(uncommentAlbum(elemToDelete));
                setConfirmation(`le commentaire a été supprimé`);
                setIsActive(true);
                setTimeout(() => {
                    activePopup(false);
                }, 3000);
                break;
            case "delete-album":
                console.log(albumToDelete);
                dispatch(deleteAlbum(albumToDelete));
                setConfirmation(`l'album a été supprimé`);
                setIsActive(true);
                setTimeout(() => {
                    activePopup(false);
                }, 3000);
                break;
            case "update-com":
                dispatch(updateComment({ id: elemToDelete, edit: formData }));
                setConfirmation(`Le commentaire a été modifié`);
                setIsActive(true);
                setTimeout(() => {
                    activePopup(false)
                }, 3000);
                break;
            case "update-album":
                // dispatch(updateAlbum());
                setConfirmation(`L'album a été modifié`);
                setIsActive(true);
                setTimeout(() => {
                    activePopup(false)
                }, 3000);
                console.log(albumData.id);
                break
            case "delete-account":
                navigate("/");
                dispatch(deleteAccount(userToDelete.id))
                console.log(status);
                console.log(userToDelete.id);
                if (status === "failed") return;
                setIsActive(true);
                setConfirmation("Votre compte a été supprimé. Au revoir ! ")
                dispatch(logout())
                console.log("success")
                setTimeout(() => {
                    activePopup(false)
                    localStorage.clear();
                }, 40000);


                break
            default:
                console.log("error from popup" + action);
                activePopup(false);
                break;
        }
    }

    // CLOSE POPUP
    const handleClick = () => {
        activePopup(false)
    }

    // FORM ONCHANGE
    const onChange = (e) => {
        setFormdata(e.target.value)
    }
    // USEEFFECT
    useEffect(() => {
        if (commentSuccess && action === "delete-com") {
            setIsActive(true);
            setDeletecomm("Le commentaire a été supprimé");
            setTimeout(() => {
                activePopup(false);

            }, 2000)


            dispatch(reset())
        }
        if (isDeleted && action === "delete-album") {
            setIsActive(true)
            setDeletecomm("L'album a été supprimé");
            setTimeout(() => {
                activePopup(false);
            }, 2000)
        }
    })

    return (
        <dialog className='form validation-popup'>
            <div onClick={()=> {activePopup(false)}} className="close-button">X</div>
            {popupContent === "regular"
                ? <>
                    <h1 className='validation-question'>{question}</h1>
                    <div className='form-container'>
                        <form className='form' onSubmit={onSubmit}>
                            {
                                action == "delete-com" || action == "delete-album" ? <input onChange={() => { }} className='input-invisible' value={elemToDelete} name="elemToDelete" />
                                    : <input onChange={onChange} className='content not-implemented' value={formData} name="content" />
                            }
                            <button id="button-yes" className='popup-button' type='submit'>{buttonYes}</button>
                            <button id="button-no" className='popup-button' onClick={handleClick} type='button'>Non non non surtout pas !</button>
                        </form>
                        {isActive && <MessageToUser message={confirmation} />}
                    </div>
                </>
                : popupContent === "delete-account-confirmation"
                    ? <div><MessageToUser message={"Votre compte a été supprimé"} /></div>
                    : <div><MessageToUser message={"demande non comprise"} /></div>
            }
        </dialog>
    );
}

export default PopUpFormValidation;


const elementContent = (option, element) => {
    if (element === "button") {
        switch (option) {
            case "delete-com":
                return "Oui je veux supprimer ce commentataire";
            case "delete-album":
                return "Oui je veux supprimer cet album";
            case "update-com":
                return "Oui je veux modifier ce commentaire";
            case "update-album":
                return "Oui je veux modifier cet album";
            case "delete-account":
                return "Je veux supprimer mon compte"
            default:
                return ""
        }
    }
    if (element === "question") {
        switch (option) {
            case "delete-com":
                return "Vous voulez vous supprimer ce commentaire ?";
            case "delete-album":
                return "Voulez-vous supprimer cet album ?";
            case "update-com":
                return "La modification des commentaires n'est pas encore disponible.";
            case "update-album":
                return "La modification des albums n'est pas encore disponible.";
            case "delete-account":
                return "Voulez-vous supprimer votre compte ?"
            default:
                return ""
        }
    }
}

