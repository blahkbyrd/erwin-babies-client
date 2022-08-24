import { useRef } from "react";
import { FaEllipsisV } from "react-icons/fa";

function SubMenu({updateComm, deleteComm}) {


    /*====== EVENTS ======*/

    // active/inactive sub-menu
    const isActive = useRef();

    const handleOnClick = () => {
        if (isActive.current.classList.contains("active")) {
            isActive.current.classList.remove("active");
            console.log("inactive menu");
        }
        else {
            isActive.current.classList.add("active")
            console.log("active menu");
        }
    }
   
    return (
        <div className='sub-menu-container'>
            <FaEllipsisV className='icon' onClick={handleOnClick} />
            <div className='sub-menu' ref={isActive}>
                <ul className='sub-menu-list'>
                    <li className='sub-menu-item' onClick={updateComm}>modifier</li>
                    <li className='sub-menu-item' onClick={deleteComm}>supprimer</li>
                </ul>
            </div>
        </div>
    );
}

export default SubMenu;