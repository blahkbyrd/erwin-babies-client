import { useState } from "react";
import ImageUploader from "./ImageUploader";

function UserInfo(props) {
    const [show, setShow] = useState(false);
    const [picker,setPicker] = useState(false);
    const showOverlay = () => {
        setPicker(true)
    }
    const showInfo = () =>{
        setShow(!show);
        setPicker(false);
    }
    const { pseudo, name, email, role, profileImage } = props.user
    
    return (
        <div className='grid user-info'>
            <img src={profileImage} alt="user-profile" className="user-profile" />
            <div>
                <h2>{pseudo}</h2>
                <button className='grid-button' onClick={showInfo}>{show ? "masquer" : "voir mes infos"} </button>
            </div>
            <div className={show ? "name active" : "name"}>
                <button onClick={showOverlay} className="change-profile-button">changer image de profil</button>
                <div className="info">prénom :</div> <div className="info">{name.firstname}</div>
                <div className="info">nom :</div> <div className="info">{name.lastname}</div>
                <div className="info">email:</div><div className="info"> {email}</div>
                <div className="info">rôle: </div><div className="info">{role === "user" ? "utilisateur" : role}</div>
            </div>
            {picker && <ImageUploader/>}
        </div>
    );
}

export default UserInfo;