FROM node:14-alpine
WORKDIR /opt/bomber
COPY . .
RUN npm ci
RUN npm run build:prod
CMD node dist/server.js --mode=production
EXPOSE 3000
