import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import Error from "../components/Error";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Notification />
      <Error />
      <LoginForm />
      {user && (
        <div>
          <h2>Blogs</h2>
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default Home;
