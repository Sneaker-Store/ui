FROM node:16.15.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@5.0.1 -g
RUN npm audit fix --force

COPY . ./

EXPOSE 3000

CMD ["npm, "start"]
