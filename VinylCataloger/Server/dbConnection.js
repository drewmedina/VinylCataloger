import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "zagilar",
  password: "Drew.123",
  database: "vinyl_catalog",
});
