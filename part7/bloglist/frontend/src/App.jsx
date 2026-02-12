import { useEffect } from "react";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";
import { Routes, Route, Navigate, useMatch, Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const userMatch = useMatch('/users/:id')
  const userMatchId = userMatch
    ? userMatch.params.id
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/" />} />
        <Route path="/users/:id" element={user ? <User userId={userMatchId} /> : <Navigate replace to="/" />} />
        <Route path="/blogs/:id" element={user ? <Blog blog={blog} /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
