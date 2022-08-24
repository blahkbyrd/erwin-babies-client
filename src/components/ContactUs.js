import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';


function ContactUs() {
    const form = useRef();
    const { value } = useSelector(state => state.user)
    const userName = value ? value.pseudo : "";
    const userMail = value ? value.email: "";
    const [formData, setFormData] = useState({
        user_name: userName,
        user_email: userMail,
        message: ""
    })

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ikejhbl', 'template_l02zcve', form.current, 'mSQm9JO0zoICWC2Zm')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div form contact>
            <form onSubmit={onSubmit} ref={form} className="contact-form">
              
                    <input onChange={onChange} type="text" name="user_name" placeholder="votre nom" value={userName}  className="form-input" required />
                    <input onChange={onChange} type="email" name="user_email" placeholder='votre email' value={userMail}  className="form-input" required/>
        
                <textarea onChange={onChange} name="message" rows={5} cols={10} placeholder="votre message"  className="form-input" required/>
                <button className='form-button' type='submit'>envoyer</button>
            </form>
        </div>
    );
}

export default ContactUs;