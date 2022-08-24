import React from 'react';

function Time({ date }) {
    let formatingDate = date.split('T')[0];
    const dateArray = formatingDate.split('-');
    formatingDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    const hour = date.split('T')[1];
    let formatingHour = (hour.split('.')[0]);
    formatingHour = formatingHour.slice(0, -3);
    return (
        <>
            <p className='date'>publié le {formatingDate} à {formatingHour}</p>
        </>
    );
}

export default Time;