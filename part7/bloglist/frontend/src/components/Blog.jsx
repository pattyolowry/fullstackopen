import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user);

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
        } catch (error) {
            console.error(`Failed to remove blog: ${error.response.data.error}`);
            dispatch(setError(error.response.data.error));
        }
        } else {
        console.log("cancel remove");
        }
    };

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
            {blog.comments.length !== 0 && (
                <>
                <h3>Comments</h3>
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment}>{comment}</li>
                    ))}
                </ul>
                </>
            )}
        </div>
    )
}

export default Blog;