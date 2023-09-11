# Use the official Node.js image as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app

# Expose the port on which your Node.js app listens
EXPOSE 3000

# Adjust the COPY command to copy app.js from the correct location
COPY apps/app.js ./   # Assuming app.js is located in the apps directory

# Start the Node.js application
CMD ["node", "app.js"]


