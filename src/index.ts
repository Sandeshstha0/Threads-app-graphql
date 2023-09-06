import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello:String,
        say(name:String):String
    }
    `, //schema
    resolvers: {
      Query: {
        hello: () => `Hey there , I am a gql server`,
        say: (_, { name }: { name: string }) => `Hey ${name} , How are you`,
      },
    },
  });
  //Start the gql server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is runnings" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
}
init();
