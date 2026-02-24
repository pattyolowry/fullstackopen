import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login ] = useMutation(LOGIN, {
        onCompleted: (data) => {
        const token = data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
        },
        onError: (error) => {
        setError(error.message)
        }
    })

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        console.log("logging in...")
        await login({ variables: { username, password } })
        setUsername('')
        setPassword('')
        setPage('authors')
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                  name
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    type="text"
                />
                </div>
                <div>
                  password
                <input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm