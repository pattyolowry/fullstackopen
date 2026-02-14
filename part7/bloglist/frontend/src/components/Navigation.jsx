import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material'

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>  
          {user && (
            <>
            <em>{user.name} logged in</em>
            <Button color="inherit" onClick={handleLogout}>
                Logout
            </Button>
            </>
          )}             
        </Toolbar>
      </AppBar>
    )

}

export default Navigation