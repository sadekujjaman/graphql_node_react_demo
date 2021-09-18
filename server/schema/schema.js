const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

/*
// dummy data for books
var books = [
    {name: 'Brazen and the Beast', genre:'Romance', id:'1', authorId: '2'},
    {name: 'Where the Crawdads Sing', genre:'Literary Fiction', id:'2', authorId: '3'},
    {name: 'The Haunting of Hill House', genre:'Horror', id:'3', authorId: '4'},
    {name: 'The Water Dancer', genre:'Fantasy', id:'4', authorId:'1'},
    {name: 'WICKED AND THE WALLFLOWER', genre:'Romance', id:'5', authorId:'2'},
    {name: 'DARING AND THE DUKE', genre:'Romance', id:'6', authorId:'2'},
    {name: 'Between the World and Me', genre:'Biography', id:'7', authorId:'1'},
    {name: 'The Road Through the Wall', genre:'Fiction', id:'8', authorId:'4'},
    
]

// dummy data for authors
var authors = [
    {name: 'Ta-Nehisi Coates', age: 45, id: '1'},
    {name: 'Sarah MacLean', age: 42, id: '2'},
    {name: 'Delia Owens', age: 72, id: '3'},
    {name: 'Shirley Jackson', age: 49, id: '4'},

]

*/

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, {id:parent.authorId})
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, {authorId: parent.id})
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(books, {id:args.id})
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, {id:args.id})
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
