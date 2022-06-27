const { reviews } = require("../lib/db");

exports.Query = {
  products: (parent, args, context) => {
    // const productsStore = context.productsStore;
    // this filter is an input type from the schema on query
    const filter = args.filter;
    let filteredProducts = context.productsStore;

    //only returns products on sale
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter(
          (products) => products.onSale
        );
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        console.log("inside");
        console.log(avgRating)
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avrproductRating = sumRating/numberOfReviews
          return avrproductRating >= avgRating
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, args, context) => {
    const productsStore = context.productsStore;
    const productId = args.id;

    return productsStore.find((product) => product.id === productId);
  },
  categories: (parent, args, context) => {
    const categories = context.categories;
    return categories;
  },
  category: (parent, args, context) => {
    const categories = context.categories;
    const { id } = args;
    return categories.find((cat) => cat.id === id);
  },
};
