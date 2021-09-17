const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()

app.use('/graphql', graphqlHTTP({

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


*/