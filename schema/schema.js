const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;
const _ = require('lodash');


// seed data for books 
var books = [
  {name: 'Outliers', id: '1', genre: 'non-fiction', authorId: '1'},
  {name: 'The Road', id: '2', genre: 'fiction', authorId: '2'},
  {name: 'House of Leaves', id: '3', genre: 'horror', authorId: '3'}
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
      age: {type: GraphQLInt}
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
      resolve(praent, args){
        
        return _.find(authors, {id: args.id})
      }

    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})