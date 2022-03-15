import { asValue, AwilixContainer } from "awilix";
import { Connection, createConnection } from "typeorm";

async function connectWithRetry(): Promise<Connection> {
  try {
    return await createConnection({
      database: "clean-arch-demo",
      username: "postgres",
      password: "Password1",
      logging: "all",

      synchronize: true,

      type: "postgres",
      url: process.env.TYPEORM_URL,
      entities: [__dirname + "/DTOs/*.ts"],
    });
  } catch (err) {
    console.error(
      "failed to connect to db on startup - retrying in 3 seconds ",
      err
    );
    await new Promise((resolve: any) => setTimeout(resolve, 3000));
    return connectWithRetry();
  }
}

export default async function registerDbConnection(
  container: AwilixContainer
): Promise<void> {
  const connection = await connectWithRetry();

  console.info("successfully established db connection");

  container.register({
    dbConnection: asValue(connection),
  });
}
