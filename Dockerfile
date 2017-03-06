FROM aparedes/alpine-node-yarn:6
MAINTAINER Nikolay Stoynov <arvigeus@gmail.com>


RUN apk add --update alpine-sdk

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN yarn global add node-gyp

RUN yarn

RUN yarn run build

CMD ["yarn", "start"]

EXPOSE 5000/tcp
