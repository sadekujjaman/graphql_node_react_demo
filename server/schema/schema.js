
const graphql = require('graphql')
const _ = require('lodash')


const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,

} = graphql

var books = [
    {name: 'Brazen and the Beast', genre:'Romance', id:'1'},
    {name: 'Where the Crawdads Sing', genre:'Literary Fiction', id:'2'},
    {name: 'The Haunting of Hill House', genre:'Horror', id:'3'},
    {name: 'The Water Dancer', genre:'Fantasy', id:'4'}
]



const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
