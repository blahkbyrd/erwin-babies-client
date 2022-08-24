import { useNavigate } from "react-router-dom"

function MobileLogo() {
    const navigate = useNavigate()
    return (
        <div onClick={() => { navigate("/") }} className="mobile-logo">
            <p id="logo-erwin">E'</p>
            <p id="logo-babies">S</p>
            
        </div>
    );
}

export default MobileLogo;