FROM node:lts

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5050

CMD ["npm","run","start:prod"]