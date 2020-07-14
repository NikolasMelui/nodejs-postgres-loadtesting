FROM node:14.5.0-alpine

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:server"]
