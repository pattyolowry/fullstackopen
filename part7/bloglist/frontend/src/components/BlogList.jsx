import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    };

    return (
         <>
          {blogs.map((blog) => (
            <div key={blog.id} className="blog" style={blogStyle}>
              <span data-testid="blog-title">
                <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
              </span>
            </div>
          ))}
        </>
    )
}

export default BlogList