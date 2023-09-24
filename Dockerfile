# Use an official Node.js runtime as the base image
FROM node:18.18.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies using yarn
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Expose any necessary ports (if your applications run on specific ports)
EXPOSE 3000

# Define the command to start your application (update this accordingly)
CMD ["yarn", "start"]
