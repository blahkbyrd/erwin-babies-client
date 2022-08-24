import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { logUser } from "../../features/usersSlice";
import Load from '../Load';
import MessageToUser from '../MessageToUser';

function LoginForm(props) {

    const navigate = useNavigate()
    // form stuff
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }



    const { email, password } = formData;

    // redux stuff
    const { user, status, message } = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState("");
    const [className, setClassName] = useState('invalid');
    const dispatch = useDispatch();

    // use Effect
    useEffect(() => {
        if (status == 'failed') {
            setClassName("invalid");
            console.log(message);
            setErrorMessage(message);
        }
        if (status == "connected") {
            setClassName("valid");

            setErrorMessage("Vous êtes connecté");
            setTimeout(
                () => {
                    navigate('/page-personelle')
                }
                , 2000
            );
        }

    }, [status, message, dispatch]);

    // events 
    const onChange = (e) => {
        setErrorMessage(message);
        setFormData((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email, password
        }
        if (!email || !password) {
            setErrorMessage("Vous n'avez pas rempli tous les champs");
            return
        }
        dispatch(logUser(userData))
    }

    if (status === "loading") return (<Load />)

    return (
        <div className='login form'>
            <h1>se connecter</h1>

            <form onSubmit={onSubmit} className="login-form">
                <input
                    className="form-input"
                    placeholder='email'
                    name='email'
                    id='email'
                    type="email"
                    value={email}
                    onChange={onChange} />
                <div className='password-container'>
                    <input
                        className='form-input'
                        onChange={onChange}
                        placeholder="entrer votre mot de passe"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        id="password"
                        name='password' />
                    <div onClick={togglePassword}>
                        {showPassword ? <AiOutlineEyeInvisible className='icon'/> : <AiOutlineEye className='icon' />}
                    </div>
                </div>
                <button
                    className="form-button" type='submit'> se connecter</button>
            </form>
            {
                errorMessage != "" &&
                <div className='error-container'>
                    <MessageToUser className={className} message={errorMessage} />
                </div>}
            <button onClick={() => { navigate('/sign-up') }} className='change-button'> Je n'ai pas de compte</button>
        </div>

    );
}

export default LoginForm;