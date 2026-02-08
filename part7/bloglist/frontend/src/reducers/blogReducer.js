import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const changedBlog = action.payload;
      const updatedState = state.map((blog) =>
        blog.id === changedBlog.id ? changedBlog : blog,
      );
      return updatedState.sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    toggleVisibility(state, action) {
      const id = action.payload;
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, visible: !blog.visible },
      );
    },
  },
});

const { setBlogs, createBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  console.log("Initializing blogs");
  return async (dispatch) => {
    let blogs = await blogService.getAll();
    blogs = blogs.map((b) => ({ ...b, visible: false }));
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const appendBlog = (blog) => {
  return async (dispatch) => {
    dispatch(createBlog(blog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(updatedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog.id));
  };
};

export const { toggleVisibility } = blogSlice.actions;
export default blogSlice.reducer;
