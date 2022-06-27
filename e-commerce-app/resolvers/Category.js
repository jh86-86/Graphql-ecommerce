exports.Category = {
  products: ({ id: categoryId }, { filter }, { productsStore }) => {
    const categoryProducts = productsStore.filter(
      (product) => product.categoryId === categoryId
    );
    let filteredCategoryProducts = categoryProducts;
    console.log(filteredCategoryProducts)

    if (filter) {
      if (filter.onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            return product.onSale;
          }
        );
      }
    }
    return filteredCategoryProducts;
  },
};
