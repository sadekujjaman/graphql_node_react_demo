
const graphql = require('graphql')
const _ = require('lodash')


const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,


} = graphql

var books = [
    {name: 'Brazen and the Beast', genre:'Romance', id:'1'},
    {name: 'Where the Crawdads Sing', genre:'Literary Fiction', id:'2'},
    {name: 'The Haunting of Hill House', genre:'Horror', id:'3'},
    {name: 'The Water Dancer', genre:'Fantasy', id:'4'},
    {name: 'WICKED AND THE WALLFLOWER', genre:'Romance', id:'5'},
    {name: 'DARING AND THE DUKE', genre:'Romance', id:'6'},
    
]

var authors = [
    {name: 'Ta-Nehisi Coates', age: 45, id: '1'},
    {name: 'Sarah MacLean', age: 42, id: '2'},
    {name: 'Delia Owens', age: 72, id: '3'},
    {name: 'Shirley Jackson', age: 49, id: '4'},

]



const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
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
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
