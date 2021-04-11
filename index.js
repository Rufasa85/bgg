const axios = require("axios")
var parseString = require('xml2js').parseString;
var express = require('express');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory

const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
});

server.applyMiddleware({ app });

app.get("/searchTest", (req, res) => {

    axios.get("https://api.geekdo.com/xmlapi2/search?query=new york zoo&type=boardgame").then(({ data }) => {
        // console.log(data);
        parseString(data, function (err, result) {

            console.table(result.items.item);
            const myRes = result.items.item.map(item => {
                return {
                    id: item.$.id,
                    title: item.name[0].$.value,
                    year: item.yearpublished[0].$.value
                }
            })
            console.log("--------------")
            console.table(myRes)
            // res.json(result)
            // const myRes = result.items.item.slice(99);
            res.json(myRes)
        });
    })

})

app.get("/idtest", (req, res) => {

    axios.get("https://api.geekdo.com/xmlapi2/thing?id=284378").then(({ data }) => {
        // console.log(data);
        parseString(data, function (err, result) {
            res.json(result.items.item[0]);
            console.log(result.items.item);
            // console.table(result.items.item);
            // const myRes = result.items.item.map(item=>{
            //     return {
            //         id:item.$.id,
            //         title:item.name[0].$.value,
            //         year:item.yearpublished[0].$.value
            //     }
            // })
            // console.log("--------------")
            // console.table(myRes)
        });
    })
})


db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });
})
