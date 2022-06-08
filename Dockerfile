FROM node:18-alpine3.14

WORKDIR /express

COPY ./ ./

RUN npm install

ENV production=true

EXPOSE 3000

CMD [ "npm","run","start" ]