FROM node:10

WORKDIR /app
COPY ./package*.json /app/
RUN npm install --production
COPY ./ /app/

EXPOSE 4000

CMD ["npm", "start"]