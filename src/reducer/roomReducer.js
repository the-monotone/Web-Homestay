import {
    ADD_ROOM,
    DELETE_ROOM,
    UPDATE_ROOM,
    GET_ROOM,
    SAVE_ROOM
} from './actionTypes'


const RANDOM_RANGE = 100000;
function checkIncludeID(list, element) {
    console.log('checking');
    for (let i in list) {
        if(list[i].id === element.id) return true;
    }
    return false;
}

export const roomReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case GET_ROOM:
        {
            console.log("Getting room list...");
            const rooms = localStorage.getItem('roomlist');
            if (rooms) state = JSON.parse(rooms);
            return state;
        }
        case SAVE_ROOM:
        {
            console.log("Saving room list...");
            localStorage.setItem('roomlist', JSON.stringify(state))
            return state;
        }
        case ADD_ROOM:
        {
            if(state.length >= RANDOM_RANGE) {alert("Full"); return state;}
            if(state.includes(payload)) {alert("Bạn đã đăng ký phòng này"); return state;}
            do {
                payload.id = Math.floor(Math.random() * RANDOM_RANGE);
            } while(checkIncludeID(state, payload))
            return [...state, payload];
        }
        case DELETE_ROOM:
        {
            let tempRoomList = [...state];
            tempRoomList = tempRoomList.filter(_room => _room !== payload.room )
            console.log('Deleted');
            return tempRoomList;
        }
        case UPDATE_ROOM: 
        {
            console.log('Updated');
            return state;
        }
        default:
            return state;
    }
}