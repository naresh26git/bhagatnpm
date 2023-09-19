# Use an official Node.js runtime as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build your server and client (adjust the build commands as needed)
RUN npm run build:server

# Expose any necessary ports (if your Node.js app listens on a specific port)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["npm", "run", "dev"]
