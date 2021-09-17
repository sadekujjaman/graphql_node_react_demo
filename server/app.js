const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://testuser:testuser@graphql-demo.cew73.mongodb.net/graphql-demo')
mongoose.connection.once('open', () => {
    console.log("Connected to mongodb database")
})


const app = express()

app.use('/graphql', graphqlHTTP({
schema,
graphiql:true
}));

app.listen(3000, () => {
    console.log("Express listening port number 3000")
})

/*

steps
1. Create directory for project (graphql_node_react_demo)
2. Create directory for server (server) inside project folder(graphql_node_react_demo)
3. init npm(npm init) inside server folder
4. create app.js file and setup the server inside app.js file
5. run the app.js file(node app / nodemon app)
6. install graphql and express-graphql inside server folder(npm install graphql express-graphql) 
7. create schema folder in server folder
8. create schema.js file in schema folder
9. import graphql and GraphQLObjectType in schema.js file
10. create BookType(Book) and RootQuery(RootQueryType) in schema.js file
11. create a schema and export it
12. import schema in app.js file
13. use schema in app.use
14. create dummy books array in scheam.js
15. install lodash in server directory.
16. return book from resolve method
17. use graphiql in app.use in app.js file


*/