import express, { Request, Response } from 'express';
import sequelize from './config/database';
 
import { loginRouter } from './routes/LogInRouter';


const app = express();
const PORT = process.env.PORT || 3000;

 

const Sequelize = require("sequelize");

app.use("/login", loginRouter);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
})();