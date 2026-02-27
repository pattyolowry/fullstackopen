const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const Book = require("./models/book");
const Author = require("./models/author");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");

      if (args.author) {
        books = books.filter((b) => b.author.name === args.author);
      }
      if (args.genre) {
        books = books.filter((b) => b.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root.id }).countDocuments();
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (args.published < 0 || args.published > 2026) {
        throw new GraphQLError(`Invalid published date: ${args.published}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.published,
          },
        });
      }

      const bookExists = await Book.exists({ title: args.title });
      if (bookExists) {
        throw new GraphQLError(`Book title must be unique: ${args.title}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        console.log("adding new author...");
        author = new Author({ name: args.author });
        author = await author.save();
      }
      let book = new Book({ ...args, author: author.id });
      book = await book.save();
      book = await book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      if (args.setBornTo < 0 || args.setBornTo > 2026) {
        throw new GraphQLError(`Invalid birth year: ${args.setBornTo}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        console.log("author not found");
        return null;
      }
      author.born = args.setBornTo;
      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "plsecret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
