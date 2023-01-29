import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  rooms: [],
  status: 'loading', //loading | succes | error
};

export const addRoom = createAsyncThunk('room/addRoom', async room => {
  try {
    await axios.post('/room/addroom', {
      room,
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const getRooms = createAsyncThunk('room/getRooms', async () => {
  try {
    const { data } = await axios.get('/room/getrooms');
    return data.rooms;
  } catch (e) {
    console.log(e.message);
  }
});

export const removeRoom = createAsyncThunk(
  'room/removeRoom',
  async (room, { dispatch }) => {
    try {
      await axios.delete(`/room/${room}`);
      dispatch(roomRemove(room));
    } catch (e) {
      console.log(e);
    }
  }
);

export const roomSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    roomRemove: (state, action) => {
      state.rooms.length > 0
        ? (state.rooms = state.rooms.filter(r => r.room !== action.payload))
        : (state.rooms = null);
    },
  },
  extraReducers: builder => {
    builder.addCase(getRooms.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.status = 'succes';
      state.rooms = action.payload;
    });

    builder.addCase(getRooms.rejected, state => {
      state.status = 'error';
    });
  },
});

export const { roomRemove } = roomSlice.actions;
export default roomSlice.reducer;
