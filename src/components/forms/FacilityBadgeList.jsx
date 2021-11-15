import React from 'react';
import { RoomContext } from '../../context/roomContext';
import { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';


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
        <Card.Text>
            {
                facList.map(fac => {
                    return (
                    <Badge pill bg="success" key = {fac} className="my-badge">
                        {getFacility(fac)}
                    </Badge>
                    )
                })
            }
        </Card.Text>
    )
}