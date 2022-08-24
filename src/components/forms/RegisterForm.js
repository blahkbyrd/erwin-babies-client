import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, reset } from '../../features/usersSlice';
import Load from '../Load';
import MessageToUser from '../MessageToUser';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { check_mail_key, check_email_api_url } from "./../../ENV_VARIABLE";
import axios from 'axios';

function RegisterForm(props) {

    // form stuff
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        pseudo: "",
        email: "",
        password: "",
        password2: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    const { firstname, lastname, pseudo, email, password, password2 } = formData;

    // redux stuff
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, status, message } = useSelector((state) => state.user);
    const [isValidEmail,setIsValidEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [className, setClassName] = useState('invalid');

    /*===== CHECK EMAIL =====*/

    const apiUrl = check_email_api_url;

    const chekEmail = async (email) => {
        try {
            const res = await axios.get(`${apiUrl}&email=${email}`)
            console.log(res.data.deliverability);
            if (res.data.deliverability == "DELIVERABLE") setIsValidEmail(true);
            else return;

        } catch (error) {
            console.log(error);
            setErrorMessage(error)
        }
    }
    const validateEmail = async (email) => {
        const isValid = await chekEmail(email);
        console.log(isValid);
        return isValid;
    }
    // use Effect
    useEffect(() => {
        if (status == "failed") {
            setClassName("invalid");
            setErrorMessage(message);
            console.log(message);
        }
        if (status == "connected") {
            setClassName("valid");
            setErrorMessage(message);
            setTimeout(
                () => {
                    navigate("/page-personelle")
                }
                , 2000
            );
        };
        console.log(message);
    }
        , [status, dispatch, navigate, message]);

    // events
    const onChange = (e) => {
        setErrorMessage(message);
        setFormData((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            firstname,
            lastname,
            pseudo,
            email,
            password
        };
        if (password != password2) {
            setErrorMessage("Les mots de passes ne sont pas identiques");
            return;
        };
        if (!firstname || !lastname || !pseudo || !email || !password) {
            setErrorMessage("Vous n'avez pas rempli tous les champs");
            return;
        }
        validateEmail(userData.email);
        if (isValidEmail) {
            console.log("Not valid");
            dispatch(createUser(userData));
        }
        else setErrorMessage("L'email n'est pas valide")
    }

    if (status == "loading") return (<Load />);

    return (
        <div className='register form'>
            <h1>créer un compte</h1>
            <form onSubmit={onSubmit} className="register-form">
                <div className='left'>
                    <input
                        className='form-input'
                        onChange={onChange}
                        placeholder="prenom"
                        type="string"
                        value={firstname}
                        id="firstname"
                        name='firstname' />
                    <input
                        className='form-input'
                        onChange={onChange}
                        placeholder="nom"
                        type="string"
                        value={lastname}
                        id="lastname"
                        name="lastname" />
                    <input
                        className='form-input'
                        onChange={onChange}
                        placeholder="pseudo"
                        type="string"
                        value={pseudo}
                        id="pseudo"
                        name='pseudo' />
                </div>
                <div className='right'>
                    <input
                        className='form-input'
                        onChange={onChange}
                        placeholder="email"
                        type="email"
                        value={email}
                        id="email"
                        name='email' />
                    <div className='password-container'>
                        <input
                            className='form-input'
                            onChange={onChange}
                            placeholder="entrer un mot de passe"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            id="password"
                            name='password' />
                        <div onClick={togglePassword}>
                            {showPassword ? <AiOutlineEyeInvisible className="icon"/> : <AiOutlineEye className="icon"/>}
                        </div>
                    </div>
                    <div className='password-container'>
                        <input
                            className='form-input'
                            onChange={onChange}
                            placeholder="confirmer le mot de passe"
                            type={showConfirmPassword ? "text" : "password"}
                            value={password2}
                            id="password2"
                            name='password2' />
                        <div onClick={toggleConfirmPassword}>
                            {showConfirmPassword ? <AiOutlineEyeInvisible className="icon"/> : <AiOutlineEye className="icon"/>}
                        </div>
                    </div>
                </div>
                <div className='middle'>
                    <button className='form-button' type='submit'>créer mon compte</button>
                </div>
            </form>
            <MessageToUser message={errorMessage} />
            <button onClick={() => { navigate('/sign-in') }} className='change-button'> J'ai déjà un compte compte</button>
        </div>
    );
}

export default RegisterForm;