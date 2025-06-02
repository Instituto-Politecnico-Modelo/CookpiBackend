import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "cookpi",
  username: "alumno",
  password: "alumnoipm",
  host: "localhost",
});

export default sequelize;