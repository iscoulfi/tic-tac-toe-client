import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addRoom, getRooms, removeRoom } from '../redux/slices/roomSlice';
import Button from 'react-bootstrap/Button';
import Results from './Results';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

const Info = ({ room }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const rooms = useSelector(state => state.room.rooms);
  const { share, hasOpponent } = useSelector(state => state.home);

  const copy = () => {
    navigator.clipboard.writeText(`${window.location.href}?room=${room}`);
    toast.success('Link copied!');
  };

  useEffect(() => {
    room && dispatch(addRoom(room));
  }, [room, dispatch]);

  const join = () => {
    dispatch(removeRoom(room));
    rooms.length > 0 && navigate(`?room=${rooms[rooms.length - 1].room}`);
  };

  return (
    <div className="info">
      <h1 className="text-center mt-4">Room: {room}</h1>

      <div className="mt-3 d-flex justify-content-center gap-5">
        <Button
          variant="outline-success"
          disabled={share ? false : true}
          onClick={copy}
        >
          Share
        </Button>
        <Button
          variant="outline-success"
          disabled={rooms === null ? true : false}
          onClick={join}
        >
          Join
        </Button>
      </div>

      {!hasOpponent ? (
        <p className="text-center mt-4">
          Waiting for an opponent <BeatLoader color="#006800" size={6} />
        </p>
      ) : (
        <Results />
      )}
    </div>
  );
};

export default Info;
