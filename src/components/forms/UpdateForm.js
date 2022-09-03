import React, {useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAlbum } from '../../features/albumSlice';
import { updateComment } from '../../features/commentSlice';
import popupContext from '../../PopupContecxt';


function UpdateForm(props) {
    const dispatch = useDispatch();
    const {activePopup, action} = useContext(popupContext)
    const [formData, setFormdata] = useState({
        title: "",
        content: "",
    })



    const elemToUpdate = props.elemID;
    
    const onChange = (e) => {
        setFormdata((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        switch (action) {
            case "update-com":
                dispatch(updateComment({ id: elemToUpdate, edit: formData.content }));
                setTimeout(()=>{
                    activePopup(false)
                },3000)
                break;
            case "update-album":
                dispatch(updateAlbum({ id: elemToUpdate, title: formData.title, content: formData.content }))
                setTimeout(()=>{
                    activePopup(false)
                },3000)
                break;
            default:
                console.log("error from popup" + action);
                break;
        }
    }

    return (
        <div className='update form'>
            <form onSubmit={onSubmit} className="update-form">
                {
                    action === "update-album"
                    &&
                    <input className='form-input' type="string" name="title" value={formData.title} onChange={onChange} placeholder="titre" />
                }
                <input className='form-input' type="string" name="content" value={formData.content} onChange={onChange} placeholder="contenu"/>
            </form>

        </div>
    );
}

export default UpdateForm;