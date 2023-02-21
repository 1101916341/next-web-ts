import "reflect-metadata";
import { Connection, getConnection, createConnection } from "typeorm";

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_DATABASE;

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (err) {
        console.log(err);
      }
      const connection = await createConnection({
        type: "mysql",
        host,
        port,
        username,
        password,
        database,
        entities: [],
        synchronize: false,
        logging: true
      });
      return connection;
    })();
  }
  return connectionReadyPromise;
};
