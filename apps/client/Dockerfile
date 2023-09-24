# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory to /client
WORKDIR /client

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Expose a port if your application requires it (e.g., if it's a web server)
# EXPOSE 3000

# Specify the command to run your application
CMD ["yarn", "start"]
