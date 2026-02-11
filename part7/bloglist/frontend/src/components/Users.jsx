import { useState, useEffect } from "react";
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll().then(response => {
            setUsers(response.sort((a, b) => b.blogs.length - a.blogs.length))
        })
      }, [])

    return (
        <div>
            <h2>Users</h2>
            <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>Blogs Created</th>
                </tr>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default Users;