FROM jelastic/nodejs:14.17.5-npm
WORKDIR /opt/bomber
COPY . .
RUN npm ci
RUN npm run build:prod
CMD node dist/server.js --mode=production
EXPOSE 3000
