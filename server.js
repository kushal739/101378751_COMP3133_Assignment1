const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const TypeDefs = require("./schema");
const Resolvers = require("./resolver");

const { ApolloServer } = require("apollo-server-express");

const dotenv = require("dotenv");
dotenv.config();

 //mongoDB Atlas Connection String
 const mongodb_atlas_url =
 "mongodb+srv://patelkushal846:eFg0YirD2CsXVjtn@cluster0.vw5bhmh.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority";
 
 
  //TODO - Replace you Connection String here
 mongoose.connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
   console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });
 

const server = new ApolloServer({
  typeDefs: TypeDefs.typeDefs,
  resolvers: Resolvers.resolvers,
});

const app = express();
app.use(bodyParser.json());
app.use("*", cors());

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `Server is running at http://localhost:4000${server.graphqlPath}`
    );
  });
})();
