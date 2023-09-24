# Use an official Node.js runtime as a parent image
FROM node:18.18.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your Node.js application listens on (if applicable)
# EXPOSE 3000

# Define the command to start your Node.js application
CMD ["node", "app.js"]
