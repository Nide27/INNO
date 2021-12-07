#Step 1

FROM node:12-alpine as build-step

WORKDIR /app

COPY . /app

RUN npm install typescript@4.4.2

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build --prod

#Step2

FROM nginx:alpine

COPY --from=build-step /app/dist/myapp /usr/share/nginx/html

EXPOSE 80