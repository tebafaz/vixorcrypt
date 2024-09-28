FROM node:latest

WORKDIR /usr/src/app

COPY package-lock.json package.json ./
RUN npm install

RUN npm install -g http-server

COPY . .
RUN npm run build

EXPOSE 10002

CMD ["http-server", "./dist", "-p", "10002"]