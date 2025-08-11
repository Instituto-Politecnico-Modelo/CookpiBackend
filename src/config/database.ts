import { Sequelize } from 'sequelize';
/*
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false, 
});
*/

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "cookpi",
  username: "alumno",
  password: "alumnoipm",
  host: "127.0.0.1",
});

export default sequelize;