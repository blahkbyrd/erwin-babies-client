import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import MessageToUser from './MessageToUser';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
   const navigate = useNavigate();
    const form = useRef();
    const { user } = useSelector(state => state.user)
    const userName = user ? user.pseudo : "";
    const userMail = user ? user.email : "";
    const [formData, setFormData] = useState({
        user_name: userName,
        user_email: userMail,
        message: ""
    })

    const [messageToUser, setMessageToUser] = useState("");

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ikejhbl', 'template_l02zcve', form.current, 'mSQm9JO0zoICWC2Zm')
            .then((result) => {
                console.log(result);
                setMessageToUser("Le message a été envoyé");
            }, (error) => {
                console.log(error.text);
                setFormData(error.text);
            });
        setTimeout(()=>{
                navigate("/")
        },3000)
    }

    return (
        <div form contact>
            <form onSubmit={onSubmit} ref={form} className="contact-form">

                <input onChange={onChange} type="text" name="user_name" placeholder="votre nom" value={formData.user_name} className="form-input" required />
                <input onChange={onChange} type="email" name="user_email" placeholder='votre email' value={formData.user_email} className="form-input" required />

                <textarea onChange={onChange} name="message" rows={5} cols={10} placeholder="votre message" className="form-input" required />
                <button className='form-button' type='submit'>envoyer</button>
            </form>
            {messageToUser!=="" && <div className='error-container'>
                <MessageToUser message={messageToUser} />
            </div>}
        </div>
    );
}

export default ContactUs;