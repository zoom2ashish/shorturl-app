FROM node:11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./
COPY . .

RUN npm install

RUN npm run build:all

ENV NODE_ENV docker

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]