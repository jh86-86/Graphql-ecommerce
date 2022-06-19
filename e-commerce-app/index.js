const { ApolloServer, gql } = require("apollo-server");
const  {productsStore}  = require('./lib/productsStore');
const {categories} = require('./lib/categories');

// we are saying that it can be a scalar type or null
// if we add bang after the scalar type we can ensure we get something or errors out
// product is an object type
//    product(id: String): Product how to have a quereable typedef
const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Catergory!]!
    catergory(id: ID!): Catergory
  }


  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  type Catergory {
      id: ID!
      name: String!
  }
`;
//scaler type, the String is a scaler type
// we can return scaler or object type
// scaler types are strings, Int, Float,Boolean etc

//object types when calling you have spceify what you want back

const resolvers = {
  Query: {
    products: () => {
      return productsStore
    },
    product: (parent, args, context)=>{
        const productId =args.id;

        return productsStore.find(product => product.id === productId);
    },
    categories: ()=>{
        return categories
    },
    catergory: (parent, args, context)=>{
        const { id } = args;
        return categories.find((cat) => cat.id === id);
        
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " + url);
});

// graphql needs type definition or schema or/and resolvers
