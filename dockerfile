FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm i

RUN npm install express

RUN npm install sequelize

RUN npm i @sequelize/mysql

RUN npx tsc 

FROM node:alpine AS produccion

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000


CMD ["node", "dist/server.js"]
