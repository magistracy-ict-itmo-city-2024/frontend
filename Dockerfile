FROM node:18.1.0-alpine as frontend
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build
ENV NODE_ENV production

#########################################

FROM nginx:1.19.2

COPY ./default.conf.template /etc/nginx/templates/default.conf.template
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=frontend /app/dist /usr/share/nginx/html
