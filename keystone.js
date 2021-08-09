require("dotenv").config();
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";
import { createAuth } from "@keystone-next/auth";
import User from "./schemas/User";
import Product from "./schemas/Product";
import ProductImage from "./schemas/ProductImage";
import CartItem from "./schemas/CartItem";
import { extendGraphqlSchema } from "./mutations/index";

//import { lists } from './schema';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

//let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 60,
  secret: process.env.COOKIE_SECRET,
};

const auth = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default auth.withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: "prisma_postgresql",
      url: process.env.DATABASE_URL || "",
    },
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: createSchema({
      CartItem,
      User,
      Product,
      ProductImage,
    }),
    //extendGraphqlSchema,
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id email name",
    }),
  })
);
