# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json package-lock.json* ./

# Install global dependencies
RUN npm install -g yarn

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the server
RUN yarn workspace client unsafe:build && rm -r apis/server/public && mkdir apis/server/public && cp -r apps/client/dist/ apis/server/public/ && yarn workspace server build:ts

# Expose a port if your application needs it
# EXPOSE 8080

# Start your application
CMD ["yarn", "turbo", "run", "dev"]
