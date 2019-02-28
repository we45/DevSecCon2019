const { GraphQLList, GraphQLObjectType } = require('graphql');
const User = require('../../models/User');
const Book = require('../../models/Book');
const BookType = require('./BookType');
const UserType =  require('./UserType');
var jwtSimple = require('jwt-simple');
var secret = 'noyb';

const ReadMeQueryRootType = new GraphQLObjectType({
    name: 'Schema',
    description: "Readme Application Schema Query",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: "List of all Users",
            resolve: async function (root, args, authorization) {
                const authToken = authorization.token
                if(authToken){
                    const bearerLength = "Bearer ".length;
                    const token = authToken.slice(bearerLength);
                    const decodedData = jwtSimple.decode(token, secret)
                    var user = await User.findOne({ _id: decodedData.id })
                }
                if(!user){
                    throw new Error('You are not authenticated!')
                }
                return await User.find({})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            description: "List of all books",
            resolve: async function (root, args, authorization) {
                const authToken = authorization.token
                if(authToken) {
                    const bearerLength = "Bearer ".length;
                    const token = authToken.slice(bearerLength);
                    const decodedData = jwtSimple.decode(token, secret)
                    var checkUser = await User.findOne({_id: decodedData.id})
                }
                if(!checkUser){
                    throw new Error('You are not authenticated!')
                }

                return await Book.find({});
            }
        }
    })
});

module.exports = ReadMeQueryRootType
