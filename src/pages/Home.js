import Cards from '../components/cards/Cards';
import RegisterForm from '../components/forms/RegisterForm';
import LoginForm from "./../components/forms/LoginForm";

import axios from "axios";

import { displayAlbum } from '../features/albumSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Home(props) {
    

    const dispatch = useDispatch();
    const {commentSuccess} = useSelector(state => state.comment);
    const {liked, message} = useSelector(state=> state.album)

    useEffect(() => {
        dispatch(displayAlbum());
    }, [commentSuccess, liked, message])

    const sign = props.form;
    return (
        <div className='home page'>
            <div>
                {sign === "register"
                    ? <RegisterForm />
                    : sign === "login"
                        ? <LoginForm /> : <Cards />}
            </div>
        </div>
    );
}

export default Home;