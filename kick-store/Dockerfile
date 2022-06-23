FROM node:alpine

WORKDIR /usr/src/ui-app

COPY package*.json /usr/src/ui-app/

#RUN npm install -g npm@8.12.1

RUN npm install

RUN npm install cors 

COPY . /usr/src/ui-app

EXPOSE 3000

CMD ["npm", "start"]
