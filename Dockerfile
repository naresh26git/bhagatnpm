# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose a port (if your Node.js application listens on a specific port)
# EXPOSE 3000

# Define the command to run your Node.js application
CMD [ "npm", "start" ]
