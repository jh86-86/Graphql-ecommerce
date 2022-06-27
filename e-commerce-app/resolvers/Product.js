exports.Product = {
    category: (parent, args, context)=>{
        const categories= context.categories;
        // example of destructing context
        // const { sayHello }= context;
        // sayHello()
      const categoryId = parent.categoryId;
      return categories.find(category => category.id === categoryId); 
    },
    reviews: (parent,args,context) =>{
      const reviews = context.reviews;
      const parentId = parent.id;

      return reviews.filter(review => review.productId === parentId);
    }
};