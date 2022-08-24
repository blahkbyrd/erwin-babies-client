import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createCom, reset } from "../../features/commentSlice";
import MessageToUser from '../MessageToUser';



function AddComment(props) {

    /*------ DATA ------*/
    const [com, setCom] = useState({
        comContent: "",
        articleId: ""
    });
    const [messageToUser, setMessageToUser] = useState('')

    const { comContent, articleId } = com;

    // redux stuff
    const dispatch = useDispatch()
    const { commentError, commentSuccess, commentMessage } = useSelector(
        (state) => state.comment);
        const {user} = useSelector(state=>state.user);
    /*====== EVENTS ======*/

    // dispatch: create comments
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createCom(com));
        setCom(() => ({
            comContent: "",
            articleId: ""
        }))
    };

    // update input value
    const handleChange = (e) => {
        setCom({
            comContent: e.target.value,
            articleId: props.articleId
        });
    };

    // handle error or dispatch : reset
    useEffect(() => {
        if (commentError) setMessageToUser(commentMessage);
        if (commentSuccess) {
            dispatch(reset())
        };
    }, [commentError, commentSuccess, dispatch, commentMessage])

    /*====== DOM ======*/
    return (
        <div className="form comment-form">
            <form onSubmit={onSubmit}>
                <input
                    name='comContent'
                    className='content'
                    placeholder='votre commentaire'
                    value={comContent}
                    onChange={handleChange}
                    type="text" />
                <button className="comm-button" type='submit'>commenter</button>
            </form>
            <MessageToUser message = {messageToUser}/>
        </div>
    );
}

export default AddComment;