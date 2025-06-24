import { Sequelize } from 'sequelize';

/*
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // o ruta relativa/absoluta al archivo
  logging: false, // opcional: desactiva los logs de SQL
});

*/
const sequelize = new Sequelize({
  dialect: "mysql",
  database: "cookpi",
  username: "alumno",
  password: "alumnoipm",
  host: "172.16.4.249",
});

export default sequelize;