FROM node:18-alpine3.14

WORKDIR /express

COPY . .

RUN npm install



CMD [ "npm","run","start" ]