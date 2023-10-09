FROM node:16-alpine as build-stage
RUN mkdir -p /home/node
WORKDIR /home/node
COPY . /home/node
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN npx nest build nest-service
CMD node ./dist/apps/nest-service/main.js
EXPOSE 4000