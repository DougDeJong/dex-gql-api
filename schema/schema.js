const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;
const _ = require('lodash');


// seed data for books 
var books = [
  {name: 'Outliers', id: '1', genre: 'non-fiction', authorId: '1'},
  {name: 'The Road', id: '2', genre: 'fiction', authorId: '2'},
  {name: 'House of Leaves', id: '3', genre: 'horror', authorId: '3'},
  {name: 'The Tipping Point', id: '4', genre: 'non-fiction', authorId: '1'},
  {name: 'Only Revolutions', id: '5', genre: 'suspense', authorId: '3'},
  {name: 'Blood Meridian', id: '6', genre: 'historical fiction', authorId: '2'}
];

var authors = [
  {name: 'Malcolm Gladwell', id: '1', age:55},
  {name: 'Cormack McCarthy', id: '2', age: 85},
  {name: 'Mark Z. Danielewski', id: '3', age:52}
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: {type: GraphQLID },
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
        type: AuthorType,
        resolve(parent, args){
          return _.find(authors, {id: parent.authorId})
        }
      }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
      id: {type: GraphQLID },
      name: {type: GraphQLString},
      age: {type: GraphQLInt},
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
          return _.filter(books, {authorId: parent.id })
        }
      }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id:{type: GraphQLID}},
      resolve(parent,args){
        
      return  _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args){
        
        return _.find(authors, {id: args.id})
      }

    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})