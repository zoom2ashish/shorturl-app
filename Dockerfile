FROM node:11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./
COPY . .

RUN ls -ltr

RUN npm install

RUN npm rebuild node-sass

RUN npm run build

ENV NODE_ENV docker

EXPOSE 3000
EXPOSE 5000

CMD [ "npm", "run", "start" ]