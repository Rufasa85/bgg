const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        turtle:String
    }
`


module.exports = typeDefs