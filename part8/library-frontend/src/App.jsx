import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client/react'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { addBookToCache } from './utils/apolloCache'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      addBookToCache(client.cache, addedBook)
    },
  })

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

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      {notification && (<div style={{ color: 'blue' }}>{notification}</div>)}

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} genres={allGenres} />

      <NewBook show={page === 'add'} />

      <Recommendation show={page === 'recommend'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
