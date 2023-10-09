FROM node:16-alpine as build-stage
RUN mkdir -p /home/node
WORKDIR /home/node
COPY . /home/node
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
RUN npx nest build meeting-chat
CMD node ./dist/apps/meeting-chat/main.js
EXPOSE 5001