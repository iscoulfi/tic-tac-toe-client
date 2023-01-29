import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/homeSlice';
import { removeRoom } from '../redux/slices/roomSlice';

function BasicExample({ sendRestart, gameOver, room }) {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(removeRoom(room));
    window.localStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <ButtonGroup aria-label="Basic example" size="lg">
      <Button
        variant="success"
        onClick={sendRestart}
        disabled={gameOver ? false : true}
      >
        Restart
      </Button>
      <Button variant="danger" onClick={logoutUser}>
        Exit
      </Button>
    </ButtonGroup>
  );
}

export default BasicExample;
