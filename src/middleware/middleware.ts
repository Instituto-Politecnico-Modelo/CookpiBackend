import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
 
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
 

  if (!token) {

    res.status(403).json({ mensaje: 'Token no proporcionado' });

    return;

  }
 
  try {

    const secretKey = 'Ensaladardamal';

    jwt.verify(token, secretKey);

    next();

  } catch (error) {
   
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
    
    return;
  }
};
