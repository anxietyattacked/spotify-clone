import express from "express";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import path from "path";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME } from "./constants";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [User],
    // ssl: {
    //   rejectUnauthorized: false
    // }
  });
  // await conn.runMigrations()
  // await OrderDetail.delete({})
  // await Order.delete({})

  // await Product.delete({})
  // await Vote.delete({})
  // await Post.delete({})
  // await User.delete({})

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    // introspection: true, //optional if you still want access to graphQL playground in production
    // playground: true
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  app.use(express.json());

  app.listen(process.env.PORT || 4000, () => {
    console.log(`server started on localhost: ${process.env.PORT}`);
  });
};
main().catch((err) => {
  console.log(err);
});
