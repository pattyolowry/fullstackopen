import { useState } from "react";
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer";
import { setError } from "../reducers/errorReducer";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const [likes, setLikes] = useState(blog.likes);
  const dispatch = useDispatch()

  const toggleDetails = () => {
    setVisible(!visible);
  };

  const buttonText = () => {
    return visible ? "Hide" : "View";
  };

  const handleLike = async () => {
    await blogService.update({
      ...blog,
      likes: likes + 1,
    });
    setLikes(likes + 1);
    dispatch(likeBlog(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const loggedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser"),
  );

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log(`removing blog ${blog.title} by ${blog.author}`);

      try {
        await blogService.remove(blog.id);
        dispatch(
          setNotification(
            `Blog removed: ${blog.title} by ${blog.author}`,
            5,
          ),
        );
        dispatch(removeBlog(blog));
      } catch (error) {
        console.error(error)
        // console.error(`Failed to remove blog: ${error.response.data.error}`);
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
        Likes <span data-testid="likes-count">{likes}</span>{" "}
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
