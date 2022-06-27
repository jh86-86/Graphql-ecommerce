const { v4: uuid } = require("uuid");
const { reviews } = require("../lib/db");

exports.Mutation = {
  addCategory: (parent, args, context) => {
    console.log(args);
    const name = args.input.name;
    console.log(name);
    const categories = context.categories;

    const newCategory = {
      id: uuid(),
      name,
    };

    // adds it to the db
    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, args, context) => {
    const name = args.input.name;
    const description = args.input.name;
    const quantity = args.input.description;
    const price = args.input.price;
    const image = args.input.image;
    const onSale = args.input.onSale;
    const categoryId = args.input.categoryId;

    const products = context.products;

    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };

    products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { reviews }) => {
    const { date, title, comment, rating, productId } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    reviews.push(newReview);

    return newReview;
  },
};
