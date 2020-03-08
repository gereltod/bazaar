FROM node:8:16.1

WORKDIR /usr/src/app

#VERSION

RUN npm -v
RUN node -v

COPY package*.json /usr/src/app
RUN rm -rf node_modules/
RUN npm install

COPY . .

EXPOSE 2999

CMD ["npm","start"]