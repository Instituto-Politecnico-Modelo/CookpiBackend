import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: "mysql",
  database: "cookpi",
  username: "alumno",
  password: "alumnoipm",
  host: "db",
});


export default sequelize;