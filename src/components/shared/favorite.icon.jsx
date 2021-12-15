import React, { useState } from 'react';

export const FavoriteIcon = ({active}) => {

    const [isActive, setActive] = useState(active);

    return(
        <div className='rounded-pill d-flex justify-content-center align-items-center' onClick={()=>setActive(!isActive)}>
        {
            !isActive ? <i class="bi bi-heart"></i> : <i class="bi bi-heart-fill"></i>
        }
        </div>
    )
}