import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setError } from "../reducers/errorReducer";
import blogService from "../services/blogs";
import Togglable from "../components/Togglable";

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
      console.log("creating blog");
  
      try {
        const returnedBlog = await blogService.create(blogObject);
        dispatch(
          setNotification(
            `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
            5,
          ),
        );
        dispatch(appendBlog(returnedBlog))
        blogFormRef.current.toggleVisibility();
      } catch (error) {
        console.log(error)
        console.error(`Failed to create blog: ${error.response.data.error}`);
        dispatch(setError(error.response.data.error));
      }
    };

  const handleNewBlog = (event) => {
    event.preventDefault();

    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });

    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
            title: &nbsp;
            <input
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
              placeholder="Title"
            />
          </label>
        </div>
        <div>
          <label>
            author:&nbsp;
            <input
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
              placeholder="Author"
            />
          </label>
        </div>
        <div>
          <label>
            url:&nbsp;
            <input
              type="text"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
              placeholder="Url"
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    </Togglable>
  );
};

export default BlogForm;
