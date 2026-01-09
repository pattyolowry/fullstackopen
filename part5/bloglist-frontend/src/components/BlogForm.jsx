const BlogForm = ({ blogTitle, blogAuthor, blogUrl, handleNewBlog, setBlogTitle, setBlogAuthor, setBlogUrl }) => (
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
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
  </div>  
)

export default BlogForm