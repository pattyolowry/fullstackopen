import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, toggleVisibility } from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer";
import { setError } from "../reducers/errorReducer";

const Blog = ({ blog }) => {
  const showWhenVisible = { display: blog.visible ? "" : "none" };
  const dispatch = useDispatch()

  const toggleDetails = () => {
    dispatch(toggleVisibility(blog.id));
  };

  const buttonText = () => {
    return blog.visible ? "Hide" : "View";
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const loggedUser = useSelector((state) => state.user);

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log(`removing blog ${blog.title} by ${blog.author}`);

      try {
        dispatch(removeBlog(blog));
        dispatch(
          setNotification(
            `Blog removed: ${blog.title} by ${blog.author}`,
            5,
          ),
        );
      } catch (error) {
        console.error(`Failed to remove blog: ${error.response.data.error}`);
        dispatch(setError(error.response.data.error));
      }
    } else {
      console.log("cancel remove");
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <span data-testid="blog-title">
        {blog.title} by {blog.author}
      </span>{" "}
      <button onClick={toggleDetails}>{buttonText()}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        Likes <span data-testid="likes-count">{blog.likes}</span>{" "}
        <button onClick={handleLike}>Like</button>
        <br />
        Added by {blog.user.name}
        <br />
        {loggedUser && loggedUser.username === blog.user.username && (
          <button onClick={handleRemove}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
