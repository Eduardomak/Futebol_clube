FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json .

COPY package-lock.json .

#COPY node_modules.zip .

#RUN unzip node_modules.zip

RUN npm install

#RUN rm node_modules.zip

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
