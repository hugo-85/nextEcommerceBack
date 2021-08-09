export default async function addToCart(root, { productId }, context) {
  //console.log("ADDING TO CART!!");
  //console.log("productId", productId);
  const sesh = context.session;
  //console.log("sesh", sesh);

  if (!sesh.itemId) throw new Error("You must be logged in to do this!!");

  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: "id,quantity",
  });
  //console.log("allCartItems", allCartItems);
  const [existingCartItem] = allCartItems;

  if (existingCartItem) {
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });
  }

  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
