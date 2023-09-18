# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the user to 'node'
USER node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Use Node.js and Yarn
RUN npm install -g yarn

# Install project dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build your server and client (adjust the build commands as needed)
RUN yarn workspace server build:ts

# Expose any necessary ports (if your Node.js app listens on a specific port)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["npm", "run", "dev"]
