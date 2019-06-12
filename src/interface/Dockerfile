FROM node:latest
COPY . /app
WORKDIR /app
#RUN sed -i "s/VUE_APP_SERVER_URL=localhost:3000/VUE_APP_SERVER_URL=server/g" .env
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
