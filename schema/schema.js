const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;



var books = [
  {name: 'The First Book', id: '1', genre: 'non-fiction'},
  {name: 'The Second Book', id: '2', genre: 'fiction'},
  {name: 'The Third Book', id: '3', genre: 'horror'}
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
        //code to get data from db or other source 
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})