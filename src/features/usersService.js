import axios from "axios";



const API_URL = "https://erwin-babies-api.herokuapp.com/api/user/";

const config = (token) => {
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return headers;
}

// create user
const createUser = async (userData) => {
    const res = await axios.post(`${API_URL}register`, userData)
    if (res.data) {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    else console.log(res);
    return res.data;
}

//log user 
const logUser = async (userData) => {
    const res = await axios.post(`${API_URL}login`, userData);
    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    console.log(res.data);
    }
    else console.log(res);
    return res.data;
}

// logout 
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('album');
}


const deleteAccount = async(token, id) =>{
    const res = await axios.delete(`${API_URL}delete/${id}`, config(token));
    return res.data;
}
const userService = { createUser, logUser, logout, deleteAccount};
export default userService;