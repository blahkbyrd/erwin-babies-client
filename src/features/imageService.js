import axios from "axios";

const API_URL = "https://erwin-babies-api.herokuapp.com/api/images/";

const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}

const uploadImages = async(imageData, token, userId) =>{
    const res = await axios.post(`${API_URL}cloudinary/${userId}`, imageData, config(token));
    return res.data;
}

const imageService = {uploadImages}
export default imageService