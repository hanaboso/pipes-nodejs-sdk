FROM node:alpine3.12

RUN apk update && apk update && apk add --no-cache \
    yarn

RUN yarn set version berry
RUN yarn set version 2.4.2
RUN mkdir -p /.yarn/berry && chmod -R 777 /.yarn/berry