import { useEffect } from "react";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import { Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user);

  const userMatch = useMatch('/users/:id')
  const userMatchId = userMatch
    ? userMatch.params.id
    : null

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/" />} />
        <Route path="/users/:id" element={user ? <User userId={userMatchId} /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
