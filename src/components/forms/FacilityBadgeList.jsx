import React from 'react';
import { RoomContext } from '../../context/roomContext';
import { useContext } from 'react';
import { Card } from 'react-bootstrap';


export const FacilityBadgeList = ({facList}) => {

    const {roomFacility } = useContext(RoomContext);

    const getFacility = (id) => {
        for (let i = 0; i < roomFacility.length; i++) {
            if (roomFacility[i].id === id) {
                return roomFacility[i].facility;
            }
        }
    }

    return(
        <Card.Text className='pb-3'>
            {
                facList.map((fac, index) => {
                    return (
                        <span key={index}>
                        { index <= 3 ? 
                            <span className='fs-6 fw-light lh-sm'>
                                {index > 0 ? <i className="bi bi-dot"></i> : ''}
                                {getFacility(fac)}
                            </span>
                            : index === 4 ? <span><i className="bi bi-dot"></i> ... </span> : <span></span>
                        }
                        </span>
                    )
                })
            }
        </Card.Text>
    )
}