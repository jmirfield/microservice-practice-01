FROM node:alpine

# Prevents CRA from breaking
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]