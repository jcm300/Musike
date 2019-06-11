FROM node:latest
COPY . /server
WORKDIR /server
RUN npm install
CMD ["npm", "start", "mongo", "graphdb"]
