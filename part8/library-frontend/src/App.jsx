import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const getGenres = () => {
    let genres = []
    const allBooks = result.data.allBooks
    for (let i = 0; i < allBooks.length; i++) {
      genres = [...genres, ...allBooks[i].genres]
    }
    return [...new Set(genres)]
  }

  const allGenres = getGenres()

  const handleLogout = (event) => {
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (<button onClick={() => setPage('add')}>add book</button>)}
        {token && (<button onClick={() => setPage('recommend')}>recommend</button>)}
        {!token && (<button onClick={() => setPage('login')}>login</button>)}
        {token && (<button onClick={handleLogout}>logout</button>)}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} genres={allGenres} />

      <NewBook show={page === 'add'} />

      <Recommendation show={page === 'recommend'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
