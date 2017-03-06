FROM mhart/alpine-node:base-6
MAINTAINER Nikolay Stoynov <arvigeus@gmail.com>


RUN apk add --update alpine-sdk

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install -g node-gyp

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 5000/tcp
