# Use an official Node.js runtime as the base image
FROM node:18.2.0

# Create and set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock /app/

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . /app/

# Expose a port if your application requires it (e.g., if it's a web server)
# EXPOSE 8080

# Specify the command to run your application
CMD ["yarn", "start"]
