# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps


# Install TypeScript globally in the container
RUN npm install -g typescript

# Copy the rest of your application code to the working directory
COPY . .

# Build your TypeScript code
RUN npm run build

# Expose a port if your application serves HTTP
 EXPOSE 3000

# Define the command to start your application
 CMD [ "npm", "start" ]
