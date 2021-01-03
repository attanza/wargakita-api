FROM node:15.5.0 AS builder
WORKDIR /wargakita-api
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:15.5.0-alpine3.10
WORKDIR /wargakita-api
COPY --from=builder /wargakita-api ./
EXPOSE 12000
CMD ["npm", "run", "start:prod"]