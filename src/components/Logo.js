import { useNavigate } from "react-router-dom"

function Logo() {
    const navigate = useNavigate()
    return (
        <div onClick={() => { navigate("/") }} className="logo">
            <div id="logo-erwin">Erwin's</div>
            <div id="logo-babies">Babies</div>
        </div>
    );
}

export default Logo;