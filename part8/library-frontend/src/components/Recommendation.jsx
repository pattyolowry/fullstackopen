import { useQuery } from '@apollo/client/react'
import { ME } from '../queries'
import Books from './Books'

const Recommendation = (props) => {
    const result = useQuery(ME)

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>Recommendations</h2>
            books in your favorite genre <b>{result.data.me.favoriteGenre}</b>
            <Books show={true} user={result.data.me} />
        </div>
    )
}

export default Recommendation