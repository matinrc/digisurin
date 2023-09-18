import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
