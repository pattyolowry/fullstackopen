import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(props.user ? props.user.favoriteGenre : "all")
  const books = useQuery(ALL_BOOKS, {variables: { genre: genre === "all" ? null : genre }})

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const filterGenre = (filter) => {
    setGenre(filter)
    books.refetch()
  }

  return (
    <div>
      {!props.user && (
        <>
        <h2>books</h2>
        <p>in genre <b>{genre}</b></p>
        </>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.genres && (
        <div>
          {props.genres.map((g) => (
            <button key={g} onClick={() => filterGenre(g)}>{g}</button>
          ))}
          <button onClick={() => filterGenre('all')}>all genres</button>
        </div>
      )}
    </div>
  )
}

export default Books
