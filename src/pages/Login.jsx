import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/homeSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    try {
      if (username.length > 0) {
        window.localStorage.setItem('user', username);
        dispatch(setUser(username));
        setUsername('');
        toast.success('Welcome to the game!');
      } else {
        toast.error('Username must contain at least one character!');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  function handleInputChange(text) {
    setUsername(text);
  }

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">Join the game</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="username"
                  className="form-control"
                  value={username}
                  onChange={event => handleInputChange(event.target.value)}
                />
                <label className="form-label">Username</label>
              </div>

              <button
                type="submit"
                className="btn btn-secondary btn-block mb-4"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
