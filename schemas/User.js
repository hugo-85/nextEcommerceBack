import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";

const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    products: relationship({ ref: "Product.user", many: true }),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: {
          fieldMode: "hidden",
        },
        itemView: { fieldMode: "read" },
      },
    }),
  },
});

export default User;
