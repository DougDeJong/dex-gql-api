const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;
const _ = require('lodash');


// seed data for books 
var books = [
  {name: 'Outliers', id: '1', genre: 'non-fiction'},
  {name: 'The Road', id: '2', genre: 'fiction'},
  {name: 'House of Leaves', id: '3', genre: 'horror'}
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: {type: GraphQLString },
      name: {type: GraphQLString},
      genre: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id:{type: GraphQLString}},
      resolve(parent,args){
        
      return  _.find(books, {id: args.id})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})