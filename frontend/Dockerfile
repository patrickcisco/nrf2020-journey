# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage

WORKDIR /app

COPY package*.json /app/

COPY yarn.lock /app/

RUN yarn install
COPY ./ /app/
RUN yarn build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest as prod

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY nginx/nginxconfig.io-franciscowines.com/ /etc/nginx/

# COPY --from=build-stage /app/build/ /usr/share/nginx/html # Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf




# FROM nginx
# RUN echo "copying over nginx configuration"
# COPY nginx/nginxconfig.io-franciscofinance/ /etc/nginx/
# RUN ls -la /etc/nginx/
# COPY  build/ /var/www/franciscofinance/public
