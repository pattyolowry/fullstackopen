import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'

const Navigation = () => {
    const padding = {
        paddingRight: 5
    }

    const navigationStyle = {
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 5,
      background: "powderblue",
    };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("logging out");
        dispatch(clearUser());
    };

    return (
      <div style={navigationStyle}>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {user && (<>{user.name} logged in <button onClick={handleLogout}>logout</button></>)}
      </div>
    )
}

export default Navigation