import { useState, useEffect } from 'react'
import userService from '../services/users'

const User = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getOne(userId).then(response => setUser(response))
    }, [])

    if (!user) {
        return (<div>Loading...</div>)
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added Blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User;