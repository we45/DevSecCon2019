const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');

require('./db/config');

const port = 3000;


const app = express()

const auth = jwt({
    secret: 'noyb',
    credentialsRequired: false
})

app.use('/api', bodyParser.json(), auth, graphqlHTTP(req =>({
    schema: schema,
    graphiql: true,
    context: { token: req.headers.authorization }
})));

// app.use('/api', bodyParser.json(), auth, graphqlHTTP(req => ({
//       schema: schema,
//       context: {
//         user: req.user
//       }
//     }))
//     )

app.listen(port, () =>{
    console.log('Server running at port', port)
});
