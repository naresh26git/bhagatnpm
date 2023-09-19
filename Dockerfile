# Use an official Node.js runtime as the base image
FROM node:14   # Use a standard LTS version of Node.js for production

# Create a working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies using Yarn (consider using Yarn for workspaces)
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build your server and client (adjust the build commands as needed)
RUN yarn workspace client unsafe:build \
    && rm -r apis/server/public \
    && mkdir apis/server/public \
    && cp -r apps/client/dist/ apis/server/public/ \
    && yarn workspace server build:ts

# Expose any necessary ports (if your Node.js app listens on a specific port)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["yarn", "workspace", "server", "dev"]
