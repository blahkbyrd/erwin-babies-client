import {useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';

import { logout, reset } from "../../features/usersSlice";
import Logo from '../Logo';
import MobileLogo from '../MobileLogo';

function Header() {
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.user);

    const [isSignInActive, setSignInIsActive] = useState(false);
    const [isSignUpActive, setSignUpIsActive] = useState(true);
    const[deconnetion, setDeconnection] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();

        if (e.target.name === "sign-in") {
            setSignInIsActive(true);
            setSignUpIsActive(false);
            navigate("/sign-in")
        }
        if (e.target.name === "sign-up") {
            navigate("/sign-up");
            setSignInIsActive(false);
            setSignUpIsActive(true);
        }
    }

    const deconnect = () => {
        setDeconnection(true);
        dispatch(logout());
        navigate('/sign-in');
        localStorage.clear();
    }
    
    return (
        <div className='header'>
            <Navbar />
            <Logo />
            <MobileLogo/>
            {
                status ==="connected"
                    ? <div className='button-container'>
                        <button name="sign-in" type='button' className='sign-button' onClick={deconnect} id={deconnetion? "active" : "inactive"}>se déconnecter</button>
                    </div>
                    : <div className='button-container'>
                        <button name="sign-in" type='button' className='sign-button' onClick={handleClick} id={isSignInActive ? "active" : "inactive"}>se connecter</button>
                        <button name="sign-up" type='button' className='sign-button' onClick={handleClick} id={isSignUpActive ? "active" : "inactive"}>créer un compte</button>
                    </div>
            }


        </div>
    );
}

export default Header;