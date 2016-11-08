FROM node:6
MAINTAINER Nikolay Stoynov <arvigeus@gmail.com>


RUN apt-get update && apt-get install -y \
  build-essential \
  g++

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install -g node-gyp

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 5000/tcp
