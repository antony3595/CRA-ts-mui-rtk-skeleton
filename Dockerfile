FROM node:16.19.0-alpine as build
WORKDIR /web
RUN apk add curl
COPY . /web
ENV PATH /app/node_modules/.bin:$PATH

ARG REACT_APP_BUILD_TYPE=development
ARG PUBLIC_URL=/

ENV REACT_APP_BUILD_TYPE=$REACT_APP_BUILD_TYPE
ENV PUBLIC_URL=$PUBLIC_URL

RUN npm install -g create-react-app
COPY package.json ./package.json
RUN npm install && npm run build
