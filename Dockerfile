# Stage 1: Build the application
FROM node:18.17.1 AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN yarn install
COPY . .
RUN yarn workspace client unsafe:build && rm -r apis/server/public && mkdir apis/server/public && cp -r apps/client/dist/ apis/server/public/ && yarn workspace server build:ts

# Stage 2: Create the final image
FROM node:18.17.1
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000 
CMD ["yarn", "turbo", "run", "dev"]
