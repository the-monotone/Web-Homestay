import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: false
}

const beHostSlice = createSlice({
    name: "host",
    initialState,
    reducers: {
        hostRegister: (state) => state.value = true,
        hostUnregister: (state) => state.value = false
    }
});

export const {hostRegister, hostUnregister} = beHostSlice.actions;

// Khi cần gọi ở component sử dụng useSelector() và useDispatch()
// Ví dụ:
// Lấy giá trị state: var isHost = useSelector(state => state.host.value)
// Gọi action: var dispatch = useDispatch(); dispatch(hostRegister());

export default beHostSlice.reducer;