import { useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const {status} = useSelector(state => state.user)

    return (
        <div className='navbar'>
            <ul>
                <li className={location.pathname==="/" ? "active" : "inactive"}><Link to="/">accueil</Link></li>
                { status ==="connected" && <li className={location.pathname==="/page-personelle" ? "active" : "inactive"}><Link to="/page-personelle">ma page</Link></li>}
            </ul>

        </div>
    );
}

export default Navbar;