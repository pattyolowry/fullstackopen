import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../reducers/userReducer'
import { setError } from '../reducers/errorReducer'
import loginService from '../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);

  if (user) {
    return null
  }

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.error));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username&nbsp;
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password&nbsp;
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm;
