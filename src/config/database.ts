import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false, 
});

/*
const sequelize = new Sequelize({
  dialect: "mysql",
  database: "cookpi",
  username: "alumno25.cacace.nicolas",
  password: "JT5+g+V39/IyRNkMzaPAeg==",
  host: "127.0.0.1",
});
*/
export default sequelize;