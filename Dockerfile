# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Build the server
RUN yarn build:server

# Expose the port your application will run on
EXPOSE 3000

# Start the server
CMD ["yarn", "workspace", "server", "start"]
