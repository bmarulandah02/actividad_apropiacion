/*
esto administra la conexion con la base de datos.
usamos la libreria mysql2 para interactuar con MYSQL.
esta libreria me permite implementar consulta , tambien transacciones, procedimientos
almacenados , etc.
Una mejor opcion es usar un ORM; son librerias con clases independientes
del motor de base de datos. sequelize, prisma...
*/

import mysql from "mysql2/promise"; //Importamos la libreria

//Creamos una constante POOL
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "db_ferreteria",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
  dateStrings: true,
  decimalNumbers: true,
});

export default pool;

