# FROM node:16.14-alpine
# WORKDIR /app-frontend
#  ...

FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000