import { useEffect, useState, useContext } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import PopUpFormValidation from '../forms/PopUpFormValidation';
import popupContext from '../../PopupContecxt';
import SubMenu from '../menu/SubMenu';
import MessageToUser from '../MessageToUser';
import Time from './Time';

function Comments(props) {

    const [comm, setComm] = useState()
    const [messageToUser, setMessageToUser] = useState('')

    /*------- context ------*/
    const { isActivePopup, activePopup, changeAction } = useContext(popupContext)

    /*------ props ------*/
    const comments = props.comment

    /*------ redux stuf ------*/
    const { user } = useSelector((state) => state.user)
    
    /*------ FETCH COMMENTS ------*/
    useEffect(() => {
   
    axios.get(` https://erwin-babies-api.herokuapp.com/api/comment/get/${comments}`)
            .then(res => {
                setComm(res.data)
            })
    }, [])


    /*====== EVENTS ======*/

    // active popup & determine action
    const updateComm = () => { 
        if (comm.user != user.id || !user) setMessageToUser("Vous ne pouvez pas supprimer ce message");
        else {
            activePopup(true);
            localStorage.setItem("comment-id", JSON.stringify(comments))
            changeAction("update-com")
        }
    };
    const deleteComm = () => {
        if (comm.user != user.id || !user) setMessageToUser("Vous ne pouvez pas supprimer ce message");
        else {
            activePopup(true);
            localStorage.setItem("comment-id", JSON.stringify(comments))
            changeAction("delete-com")
        }
    };

    /*====== DOM ======*/
    return (
        <div className='comment-container'>
            {
                comm != null &&
                <div className='commentary'>
                    <p className='commentary-content'>{comm.content}</p>
                    <SubMenu action="" deleteComm={deleteComm} updateComm={updateComm}/>
                    <p className='commentary-creator'><span className='by'>par</span> {comm.creator}</p>
                    <Time date={comm.createdAt}/>
                </div>
            }
            {
                isActivePopup && <PopUpFormValidation elemToDelete={comments} action="delete-com" />
            }
            <MessageToUser message = {messageToUser}/>
        </div>
    );
}

export default Comments;