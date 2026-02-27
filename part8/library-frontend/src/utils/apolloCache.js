import { ALL_BOOKS } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
  // First update the cache for no filter applied
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    const bookExists = allBooks.some((book) => book.id === bookToAdd.id);

    if (bookExists) {
      return { allBooks };
    }

    return {
      allBooks: allBooks.concat(bookToAdd),
    };
  });

  // Then update caches for relevant genre filters
  for (let i = 0; i < bookToAdd.genres.length; i++) {
    try {
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: bookToAdd.genres[i] } },
        ({ allBooks }) => {
          const bookExists = allBooks.some((book) => book.id === bookToAdd.id);
          if (bookExists) {
            return { allBooks };
          }
          return {
            allBooks: allBooks.concat(bookToAdd),
          };
        },
      );
    } catch (error) {
      console.log("query not in cache");
    }
  }
};
