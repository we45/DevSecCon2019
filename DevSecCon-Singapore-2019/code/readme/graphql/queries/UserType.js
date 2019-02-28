const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: "This represent an user",
    fields: () =>({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        // password: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString }
    })
});

module.exports = UserType
