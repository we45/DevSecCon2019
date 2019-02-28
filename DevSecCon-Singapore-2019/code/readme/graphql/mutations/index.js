var { createUser, updateUser, deleteUser, loginUser } = require('./UserMutation');
var { createBook, updateBook, deleteBook } = require('./BookMutation');

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    createBook,
    updateBook,
    deleteBook
}
