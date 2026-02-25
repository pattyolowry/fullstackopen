import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(props.user ? props.user.favoriteGenre : "all")
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = genre === "all"
    ? result.data.allBooks
    : result.data.allBooks.filter((b) => b.genres.includes(genre))

  const getGenres = () => {
    let genres = []
    const allBooks = result.data.allBooks
    for (let i = 0; i < allBooks.length; i++) {
      genres = [...genres, ...allBooks[i].genres]
    }
    return [...new Set(genres)]
  }

  const allGenres = getGenres()

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
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!props.user && (
        <div>
          {allGenres.map((g) => (
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          ))}
          <button onClick={() => setGenre('all')}>all genres</button>
        </div>
      )}
    </div>
  )
}

export default Books
