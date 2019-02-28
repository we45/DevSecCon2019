const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const User  = require('../../models/User');
const UserType = require('./UserType');
const mongoose = require('mongoose');

const BookType = new GraphQLObjectType({
    name: 'BookType',
    description: "This is resent book",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        publication: { type: GraphQLString },
        user_id: { type: GraphQLString },
        user: { type: UserType, resolve: async function(book){
            var users = await User.findById({ _id: book.user_id[0] })
                if(!users) {
                    throw new Error(' Error')
                }
            return users
        }}
    })
});

module.exports = BookType

