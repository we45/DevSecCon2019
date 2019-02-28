var { GraphQLNonNull, GraphQLString } = require('graphql');
var UserType = require('../queries/UserType');
var User = require('../../models/User')
var jwtSimple = require('jwt-simple');
const bcrypt = require("bcrypt");
var secret = 'noyb';

const createUser = {
    type: UserType,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            name: 'password',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const uModel = {};
        if(param.name) {
            uModel.name = param.name
        }
        if(param.email) {
            uModel.email = param.email
        }
        if(param.password) {
            const hashPass = await bcrypt.hash(param.password, 10)
            uModel.password = hashPass
        }
        const newUser = await User.create(uModel);
        if(!newUser) {
            throw new Error('Error')
        }
        const payload = {id: newUser.id, email: newUser.email}
        const token = jwtSimple.encode(payload, secret)
        return token
    }
}

const updateUser = {
    type: UserType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
        let updateUser = {};

        if(param.name) {
            updateUser.name = param.name
        }
        if(param.email) {
            updateUser.email = param.email
        }
        const uUser = await User.findByIdAndUpdate(param._id, updateUser, {new: true})
        if(!uUser) {
            throw new Error('Error')
        }
        return uUser
    }
}

const deleteUser = {
    type: UserType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const deleteUser = await User.findByIdAndRemove(param._id)
        if(!deleteUser){
            throw new Error('Error')
        }
        return deleteUser
    }
}

const loginUser = {
    type: UserType,
    args: {
        email: {
            name: 'email',
            type: GraphQLString
        },
        password: {
            name: 'password',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
        const user = await User.findOne({ email: param.email })
        if (!user) {
            throw new Error('No user with that email')
        }
        // const hashPass = await bcrypt.hash(param.password, 10)
        const valid = await bcrypt.compare(param.password, user.password)
        if (!valid) {
            throw new Error('Incorrect password')
        }
        console.log("valid", valid)
        const payload = {id: user.id, email: user.email}
        const token = jwtSimple.encode(payload, secret)
        console.log("user email", token)
        user.token = token
        return user

    }
}

module.exports = { createUser, updateUser, deleteUser, loginUser }
