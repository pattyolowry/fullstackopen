import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useState } from "react";
import { setError } from "../reducers/errorReducer";
import { setNotification } from "../reducers/notificationReducer";
import { addComment } from '../reducers/blogReducer'
import blogService from "../services/blogs";
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user);
    const navigate = useNavigate()

    if (!blog) {
        return (<div>Loading...</div>)
    }

    const handleLike = () => {
        dispatch(likeBlog(blog));
    };

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
                navigate('/')
            } catch (error) {
                console.error(`Failed to remove blog: ${error.response.data.error}`);
                dispatch(setError(error.response.data.error));
            }
        } else {
            console.log("cancel remove");
        }
    };

    const handleNewComment = async (event) => {
        event.preventDefault()
        if (comment.length < 5) {
            dispatch(setError("Comment too short", 5))
            return
        }

        try {
            await blogService.addComment(blog.id, comment);
            dispatch(addComment(blog, comment))
            dispatch(setNotification("Comment added", 5))
            setComment("")
        } catch (error) {
            dispatch(setError(`Error adding comment: ${error}`))
        }
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a><br />
            <span data-testid="likes-count">{blog.likes}</span> Likes{" "}
            <button onClick={handleLike}>Like</button><br />
            Added by {blog.user.name}<br />
            {loggedUser && loggedUser.username === blog.user.username && (
              <button onClick={handleRemove}>Remove</button>
            )}
            <h3>Comments</h3>
            <form onSubmit={handleNewComment}>
                <input
                    type="text"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    placeholder="Add Comment"
                />
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog;