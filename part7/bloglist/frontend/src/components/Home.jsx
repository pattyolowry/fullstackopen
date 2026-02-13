import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
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
