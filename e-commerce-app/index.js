const { ApolloServer } = require("apollo-server");
const { categories, productsStore, reviews } = require("./lib/db");
const { typeDefs } = require("./schema/schema");
const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");
const { Mutation } = require("./resolvers/Mutation");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
  },
  // can access context in resolvers  via context :)
  //   context: {
  //       sayHello: ()=> console.log('Hello')
  //   }
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " + url);
});

// graphql needs type definition or schema or/and resolvers
