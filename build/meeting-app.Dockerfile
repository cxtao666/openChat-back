FROM node:latest 
RUN mkdir -p /home/node
WORKDIR /home/node
COPY . /home/node
run npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npx nest build 
CMD node ./dist/apps/meeting/main.js
EXPOSE 4000