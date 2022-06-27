const { gql } = require("apollo-server");

// we are saying that it can be a scalar type or null
// if we add bang after the scalar type we can ensure we get something or errors out
// product is an object type
//    product(id: String): Product how to have a quereable typedef
// non scaler types are for example customer objects we define

//scaler type, the String is a scaler type
// we can return scaler or object type
// scaler types are strings, Int, Float,Boolean etc

//object types when calling you have spceify what you want back

// can add filter to type def see below

exports.typeDefs = gql`
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  #   type Product {
  #     id: ID!
  #     name: String!
  #     description: String!
  #     image: String!
  #     quantity: Int!
  #     price: Float!
  #     onSale: Boolean!
  #     categoryId: ID
  #   }
  type Product {
    id: ID!
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
    deleteCategory(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput{
      name: String!
      description: String!
      quantity: Int!
      price: Int!
      image: String!
      onSale: Boolean!
      categoryId: String!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;

//scalar types vs inputs
// mutations are like crud