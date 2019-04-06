FROM node:10

WORKDIR /app
COPY ./package*.json /app/
RUN npm install --production
COPY ./ /app/

EXPOSE 4000

# Add wait utility
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# This will wait until the database has started. See WAIT_HOSTS environment variable
CMD /wait && npm start