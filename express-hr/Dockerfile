FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . .
ENV PATH=$PATH:/app/node_modules/.bin
EXPOSE 80
CMD ["npm", "start"]