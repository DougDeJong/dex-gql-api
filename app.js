const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();


app.use(cors());


// mongoose setup
mongoose.connect('mongodb://dej:test123@ds147003.mlab.com:47003/dex-app-gql');
mongoose.connection.once('open', () => {
  console.log('connected to M-Lab database');
});


// graphql setup

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
  })
);



// port setup

app.listen(4000, () => {
  console.log("listening on port 4000");
});
