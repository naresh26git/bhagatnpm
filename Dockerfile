# Use an official Node.js runtime as a parent image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Install npm globally and use it to install yarn
RUN npm install -g yarn

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port if your application listens on a specific port
EXPOSE $PORT

# Build the server using yarn
RUN yarn build:server

# Define the command to start your Node.js application
CMD ["yarn", "workspace", "server", "start"]
