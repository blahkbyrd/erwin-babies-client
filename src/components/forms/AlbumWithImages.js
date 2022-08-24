import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbumWithImages } from '../../features/albumSlice';
import { useNavigate } from 'react-router-dom';
import { PickerOverlay } from 'filestack-react';
import MessageToUser from '../MessageToUser';

function AlbumWithImages(props) {

    const navigate = useNavigate();
    // redux stuff
    const dispatch = useDispatch();
    const { message } = useSelector(state => state.album);

    const [isPicker, setIsPicker] = useState(false);
    const [toValidate, setToValidate] = useState(false);
    const [images, setImages] = useState('');
    const [isActive, setIsActive] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const [imagesUrl, setImagesUrl] = useState([])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const uploadFile = () => {
        setIsPicker(!isPicker);
        setToValidate(true)
    }
    const validateImage = () => {

        images.filesUploaded.map(img => {
            console.log(img);
            console.log(img.url);
            setImagesUrl((prevState) => ([
                ...prevState, img.url
            ]))
        })
        setToValidate(!toValidate)
    }

    const invalidateImage = () => {
        setToValidate(!toValidate)
        setImagesUrl([])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let data = { title: formData.title, content: formData.content, url: imagesUrl }
        dispatch(createAlbumWithImages(data));
        setFormData({
            title: "",
            content: ""
        })
        setIsActive(true)

        setTimeout(() => {
            navigate('/')
            setIsActive(false)
        }, 5000)
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                {
                    images && images.filesUploaded && toValidate
                        ? <div className='images-to-upload-container'>
                            <div className='upload-image-container'>
                                {images.filesUploaded.map(
                                    img =>
                                        <img key={img.handle} src={img.url} alt="" />
                                )}
                            </div>
                            <div class="button-container preview-valid-btn">
                                <button id="button-yes" type='button' onClick={validateImage}>valider</button>
                                <button id="button-no" type='button' onClick={invalidateImage}>annuler</button>
                            </div>
                        </div>
                        : <button onClick={uploadFile} type='button' className='form-button' id="upload-btn">Ajouter des images</button>
                }

                <input name="title" value={formData.title} onChange={onChange} type='text' placeholder="Titre de l'album" className="form-input" required={true} />
                <textarea name="content" value={formData.content} onChange={onChange} cols={50} rows={10} type='text' placeholder="Votre texte..." className="form-input" />
                <button type="submit" className='form-button'>envoyer</button>
            </form>
            {
                isPicker && (<PickerOverlay
                    apikey={"AhCPCVTHT5E5GP6DNpQUwz"}
                    onSuccess=
                    {
                        (res) => {
                            setImages(res);
                            setIsPicker(false);
                        }
                    }
                    onUploadDone=
                    {
                        (res) => {
                            setFormData(prevState => (
                                {
                                    ...prevState,
                                    url: res.filesUploaded.url
                                }
                            ))
                            setIsPicker(false)
                        }
                    }
                    onError={(res) => alert(res)}
                    pickerOptions={{
                        maxFiles: 3,
                        accept: "image/*",
                        maxSize: 1 * 4000 * 4000
                    }}
                />)
            }
            {isActive && <MessageToUser message={message === "success" ? "L'album a été crée" : message} />}
        </div>
    );
}

export default AlbumWithImages;