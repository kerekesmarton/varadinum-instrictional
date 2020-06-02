// https://auth0.com/blog/develop-modern-apps-with-react-graphql-apollo-and-add-authentication/
const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');

const books = [
    { id: 1, title: 'The Trials of Brother Jero',  cover_image_url: 'ssdsds', average_rating: 8, authorId: 1 },
    { id: 2, title: 'Half of a Yellow Sun',  cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
    { id: 3, title: 'Americanah',  cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
    { id: 4, title: 'King Baabu',  cover_image_url: 'sdsds', average_rating: 7, authorId: 1 },
    { id: 5, title: 'Children of Blood and Bone',  cover_image_url: 'sdsds', average_rating: 7, authorId: 2 },
  ];

  const authors = [
    { id: 1, first_name: 'Wole', last_name: 'Soyinka' },
    { id: 2, first_name: 'Tomi', last_name: 'Adeyemi' },
    { id: 3, first_name: 'Chimamanda', last_name: 'Adichie' },
  ];

 const typeDefs = gql`
    type Author {
      id: Int!
      first_name: String!
      last_name: String!
      books: [Book]!
    }

    type Book {
      id: Int!
      title: String!
      cover_image_url: String!
      average_rating: Float!
      author: Author!
    }

    type Query {
      books: [Book!]!,
      book(id: Int!): Book!
      author(id: Int!): Author!

    }

    type Mutation {
      addBook(title: String!, cover_image_url: String!, average_rating: Float!, authorId: Int!): Book!
    }
  `;

  let book_id = 5;
  let author_id = 3;

  const resolvers = {
    Query: {
      books: () => books,
      book: (_, { id }) => find(books, { id: id }),
      author: (_, { id }) => find(authors, { id: id }),
    },
    Mutation: {
     addBook: (_, {title, cover_image_url, average_rating, authorId }) => {
        book_id++;

        const newBook = {
          id: book_id,
          title,
          cover_image_url,
          average_rating,
          author_id
        };

        books.push(newBook);
        return newBook;
      }
    },
    Author: {
      books: (author) => filter(books, { authorId: author.id }),
    },
    Book: {
      author: (book) => find(authors, { id: book.authorId }),
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });