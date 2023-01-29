import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  grid: Array(9).fill(''),
  turnNumber: 0,
  gameOver: false,
  myTurn: true,
  xo: 'X',
  player: '',
  hasOpponent: false,
  share: true,
  turnData: false,
  resultX: 0,
  resultO: 0,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setTurnNumber: (state, action) => {
      state.turnNumber = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    setMyTurn: (state, action) => {
      state.myTurn = action.payload;
    },
    setXO: (state, action) => {
      state.xo = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setHasOpponent: (state, action) => {
      state.hasOpponent = action.payload;
    },
    setShare: (state, action) => {
      state.share = action.payload;
    },
    setTurnData: (state, action) => {
      state.turnData = action.payload;
    },
    setResults: (state, action) => {
      action.payload === 'X' ? state.resultX++ : state.resultO++;
    },
  },
});

export const {
  logout,
  setUser,
  setGrid,
  setTurnNumber,
  setGameOver,
  setMyTurn,
  setXO,
  setPlayer,
  setHasOpponent,
  setShare,
  setTurnData,
  setResults,
} = homeSlice.actions;
export default homeSlice.reducer;
