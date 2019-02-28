var { GraphQLNonNull, GraphQLString } = require('graphql');
var Book = require('../../models/Book');
var BookType = require('../queries/BookType');

const createBook = {
    type: BookType,
    args: {
        title: {
            name: "title",
            type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
            name: 'user_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        publication: {
            name: 'publication',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const bookModel = new Book(param)
        const saveBook  = await bookModel.save()
        if(!saveBook) {
            throw new Error ('Error')
        }
        return saveBook;
    }
}

const updateBook = {
    type: BookType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
            name: 'user_id',
            type: GraphQLString
        },
        title: {
            name: 'publication',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
        let updateBook = {};
        if(param.user_id) {
            updateBook.user_id = param.user_id
        }

        if(param.title) {
            updateBook.title = param.title
        }

        if(param.publication) {
            updateBook.publication = param.publication
        }

        const updateBookInfo = await Book.findByIdAndUpdate(param._id,updateBook,{new: true});

        if(!updateBookInfo) {
            throw new Error('Error')
        }
        return updateBookInfo;
    }
}


const deleteBook = {
    type: BookType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const deleteBook = await Book.findByIdAndRemove(param._id);
        if(!deleteBook) {
            throw new Error('Error')
        }
        return deleteBook;
    }
}

module.exports = { createBook, updateBook, deleteBook }
