import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";

const Product = list({
  fields: {
    name: text({ isRequired: true }),
    description: text(),
    price: integer(),
    photo: relationship({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    user: relationship({
      ref: "User.products",
      //defaultValue: ({ context }) => ({ connect: context.session.itemId }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ["name", "price", "photo"],
    },
  },
});

export default Product;
