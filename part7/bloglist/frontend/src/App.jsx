import { useEffect} from "react";
import Home from "./components/Home";
import Users from "./components/Users";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
