const { GraphQLObjectType,GraphQLSchema } = require('graphql');
const mutation = require('./mutations/index')
const ReadMeQueryRootType = require('./queries/index')

const schema = new GraphQLSchema({
   query: ReadMeQueryRootType,
   mutation: new GraphQLObjectType({
       name: 'Mutation',
       fields: mutation
   })
});

module.exports = schema;
