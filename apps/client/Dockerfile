# Use the official Node.js runtime as a parent image
FROM node:18.18.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start","index.html"]
