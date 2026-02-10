import { useEffect} from "react";
import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Error from "../components/Error";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from '../reducers/blogReducer'
import { clearUser, initializeUser } from '../reducers/userReducer'

const Home = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    console.log("logging out");
    dispatch(clearUser());
  };

  return (
    <div>
      <Notification />
      <Error />
      <LoginForm />
      {user && (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default Home;
