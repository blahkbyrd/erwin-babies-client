import { useState, useRef, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PopUpFormValidation from '../forms/PopUpFormValidation';
import popupContext from '../../PopupContecxt';
import { likeAlbum } from "../../features/albumSlice";

import defaultImage from "../../images/box.png";
import fakeProfile from "../../images/wool.svg";

import { FaRegHeart, FaRegCommentAlt } from 'react-icons/fa';
import Comments from './Comments';
import AddComment from '../forms/AddComment';
import SubMenu from '../menu/SubMenu';
import MessageToUser from '../MessageToUser';
import Time from './Time';


function Card(props) {


    /*------ props ------*/
    const post = props.post;
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const { activePopup, changeAction, isActivePopup } = useContext(popupContext)

    const numberOfComments = post.commentary.length;
    const commentId = post.commentary;

    /*------ states ------*/
    const [commentPost, setCommentPost] = useState(false);
    const [like, setLike] = useState({ like: post._id });
    const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
    const [messageToUser, setMessageToUser] = useState('')
    /*------ ref ------*/
    const commContainer = useRef();

    /*------ redux stuf ------*/
    const dispatch = useDispatch();
    const { albumData, message, status } = useSelector(state => state.album);

    /*====== EVENTS ======*/

    // active popup & determine action 

    const updateAlbum = () => {
        if (post.user != user.id || !albumData) setMessageToUser("Vous ne pouvez pas modifier cet album")
        else {
            activePopup(true);
            localStorage.setItem("album-id", JSON.stringify(post._id))
            changeAction("update-album")
        }
    }
    const deleteAlbum = () => {
        if (post.user != user.id || !post) setMessageToUser("Vous ne pouvez pas supprimer cet album");
        else {
            activePopup(true);
            localStorage.setItem("album-id", JSON.stringify(post._id))
            changeAction("delete-album")
        }
    }

    // check if image url is ok
    const imageOnErrorHandler = (e) => {
        e.currentTarget.src = defaultImage;
        e.currentTarget.className = "error";
    };

    // add/remove like
    const liked = (e) => {
        console.log(post);
        e.preventDefault();
        setLike({ like: post._id })
        dispatch(likeAlbum(like))
        console.log(post);

    }


    useEffect(() => {
        if (status === "success") {
            switch (message) {
                case "message aimé":

                    setNumberOfLikes(numberOfLikes + 1);

                    break;
                case "Vous n'aimez plus ce message":

                    setNumberOfLikes(numberOfLikes - 1);

                    break;
                default: return;
            }
        }
    }, [message])

    // active/inactive comment form
    const addComm = (e) => {
        setCommentPost(!commentPost)
        if (commContainer.current.classList.contains("comm-active"))
            commContainer.current.classList.remove("comm-active")
        else
            commContainer.current.classList.add("comm-active");
    }

    /*====== DOM ======*/
    return (
        <div className='post-container'>
            {
                location.pathname === "/page-personelle" &&
                <SubMenu deleteComm={deleteAlbum} updateComm={updateAlbum} />}
            {
                isActivePopup && <PopUpFormValidation deleteComm={deleteAlbum} updateComm={updateAlbum} />
            }
            <div className={`card ${props.type}`}>
                <div className='card-content'>
                    <div className='profile'>
                        <img className="user-profile in-card" src={post.profile ? post.profile : fakeProfile} alt='user-profile'></img>
                        <p className='user'> par {post.creator}</p>

                    </div>
                    <h1 className='title'>{post.title}</h1>
                    <p className='content'>{post.content}</p>
                </div>
                {post.url.length > 0 &&
                    <div className='image-post-container'>
                        {post.url.map((image, index) => {

                            return <img className="album-image" alt={post.title} src={image} key={index} onError={imageOnErrorHandler} />
                        })}
                    </div>}

                <div className='meta-data'>
                    <Time date={post.createdAt} />
                    <div>
                        <FaRegHeart className='icon like-button' onClick={liked} type="button" />
                        <span> {numberOfLikes}</span>
                    </div>
                    <div>
                        <FaRegCommentAlt className='icon comment-button' onClick={addComm} />
                        <span> {numberOfComments}</span>
                    </div>
                </div>
            </div>
            {commentPost &&
                <>
                    <AddComment articleId={post._id} />
                </>
            }
            {
                numberOfComments > 0 &&
                <div ref={commContainer} className='comm-container'>{
                    commentId.map((comm, index) => {
                        return <div>
                            <Comments comment={comm} key={index} />
                        </div>
                    })
                }
                </div>
            }
            <MessageToUser message={messageToUser} />
        </div>
    );
}


export default Card;