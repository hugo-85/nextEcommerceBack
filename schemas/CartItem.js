import { integer, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

const CartItem = list({
  fields: {
    quantity: integer({ defaultValue: 1, isRequired: true }),
    product: relationship({ ref: "Product" }),
    user: relationship({ ref: "User.cart" }),
  },
});

export default CartItem;
