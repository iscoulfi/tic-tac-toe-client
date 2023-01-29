import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGameOver,
  setGrid,
  setHasOpponent,
  setMyTurn,
  setPlayer,
  setResults,
  setShare,
  setTurnData,
  setTurnNumber,
  setXO,
} from '../redux/slices/homeSlice';
import winCombination from '../assets/winCombination';
import random from '../assets/random';
import Grid from '../components/Grid';
import ButtonGroup from '../components/ButtonGroup';
import Login from './Login';
import Info from '../components/Info';
import { removeRoom } from '../redux/slices/roomSlice';

const socket = io(process.env.REACT_APP_SERVER);

const Home = () => {
  const {
    player,
    user,
    grid,
    turnNumber,
    gameOver,
    myTurn,
    xo,
    hasOpponent,
    turnData,
  } = useSelector(state => state.home);

  const dispatch = useDispatch();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsRoom = params.get('room');
  const [room, setRoom] = useState(paramsRoom);

  const handleCellClick = index => {
    if (!grid[index] && !gameOver && myTurn && hasOpponent) {
      socket.emit('reqTurn', JSON.stringify({ index, value: xo, room }));
    }
  };

  const sendRestart = () => {
    socket.emit('reqRestart', JSON.stringify({ room }));
  };

  const restart = useCallback(() => {
    dispatch(setGameOver(false));
    dispatch(setGrid(Array(9).fill('')));
    dispatch(setTurnNumber(0));
  }, [dispatch]);

  useEffect(() => {
    for (let i = 0; i < winCombination.length; i++) {
      const [x, y, z] = winCombination[i];
      if (grid[x] && grid[x] === grid[y] && grid[y] === grid[z]) {
        dispatch(setGameOver(true));
        dispatch(setResults(player));
      }
    }
  }, [grid, xo, player, dispatch]);

  useEffect(() => {
    socket.on('playerTurn', json => {
      dispatch(setTurnData(json));
    });
    socket.on('restart', () => {
      restart();
    });
    socket.on('opponent_joined', () => {
      dispatch(setHasOpponent(true));
      dispatch(setShare(false));
      dispatch(removeRoom(room));
    });
  }, [dispatch, restart, room]);

  useEffect(() => {
    if (turnData) {
      const data = JSON.parse(turnData);
      let g = [...grid];
      if (!g[data.index] && !gameOver) {
        g[data.index] = data.value;
        dispatch(setGrid(g));
        dispatch(setTurnNumber(turnNumber + 1));
        dispatch(setTurnData(false));
        dispatch(setMyTurn(!myTurn));
        dispatch(setPlayer(data.value));
      }
    }
  }, [turnData, grid, turnNumber, gameOver, myTurn, dispatch]);

  useEffect(() => {
    if (paramsRoom) {
      dispatch(setXO('O'));
      socket.emit('join', paramsRoom);
      setRoom(paramsRoom);
      dispatch(setMyTurn(false));
    } else {
      const newRoomName = random();
      socket.emit('create', newRoomName);
      setRoom(newRoomName);
      dispatch(setMyTurn(true));
    }
  }, [paramsRoom, dispatch]);

  return (
    <>
      {user || window.localStorage.user ? (
        <>
          <Info room={room} />

          <Grid
            grid={grid}
            onClick={gameOver ? sendRestart : handleCellClick}
          />

          <div className="mt-3 d-flex justify-content-center ">
            <ButtonGroup
              sendRestart={sendRestart}
              gameOver={gameOver || turnNumber === 9}
              room={room}
            />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
