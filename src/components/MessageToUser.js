import React from 'react';

function MessageToUser(props) {
    return (
        <div className='message-to-user'>
            <p>{props.message}</p>
        </div>
    );
}

export default MessageToUser;