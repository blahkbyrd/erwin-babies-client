import { useState } from 'react';
import { PickerOverlay } from 'filestack-react';
import { useDispatch } from 'react-redux';
import { uploadingProfileImage } from "../features/imageSlice"

function ImageUploader(props) {

    const [isPicker, setIsPicker] = useState(true);
    const [buttonConfirm, setButtonConfirm] = useState(false)
    const [formData, setFormData] = useState({ url: "" });
    const dispatch = useDispatch()

    const validateImage = () => {
        dispatch(uploadingProfileImage(formData));
        setButtonConfirm(false)
    }

    const invalidateImage = () => {
        setIsPicker(false)
        setButtonConfirm(false)
    };

    return (
        <div className='image-uploader'>
            {isPicker && <PickerOverlay
                apikey={"AhCPCVTHT5E5GP6DNpQUwz"}
                onSuccess=
                {
                    (res) => {

                        setIsPicker(false);
                    }
                }
                onUploadDone=
                {
                    (res) => {
                        setFormData(
                            {
                                url: res.filesUploaded[0].url
                            }
                        )
                        setIsPicker(false)
                        setButtonConfirm(true)
                    }
                }
                onError={(res) => alert(res)}
                pickerOptions={{
                    maxFiles: 3,
                    accept: "image/*",
                    maxSize: 1 * 4000 * 4000
                }}
            />}
            {
                buttonConfirm &&
                <div className='validate-upload-image'>
                    <img id='prewiew-profile' src={formData.url} alt="preview"/>
                    <div>
                        <button id="button-yes" type='button' onClick={validateImage}>valider</button>
                        <button id="button-no" type='button' onClick={invalidateImage}>annuler</button>
                    </div> </div>}
        </div>
    );
}

export default ImageUploader;