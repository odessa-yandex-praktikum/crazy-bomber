FROM nodejscn/node:lts
WORKDIR /var/www
COPY dist dist
COPY ./src/server/server.js server.js
CMD npm install express && node ./server.js
EXPOSE 4000
