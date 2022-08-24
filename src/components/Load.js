import {FaVolleyballBall } from 'react-icons/fa';

function Load() {
    return (
        <div>
            <div className='loading-ball'>
                <FaVolleyballBall className='ball' />
                <div className='thread'></div>
            </div>
           
        </div>
    );
}

export default Load;