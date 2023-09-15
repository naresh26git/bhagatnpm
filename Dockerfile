# Stage 1: Build the application
FROM node:18.17.1 AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build:server


# Stage 2: l image
FROM node:18.17.1
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000 
CMD ["yarn"]
