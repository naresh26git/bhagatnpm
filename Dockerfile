# Use the official Node.js image with your desired version
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Build your Node.js application
RUN yarn run build

# Expose the port your application will run on (if applicable)
# EXPOSE 80

# Define the command to start your application
CMD [ "yarn", "start" ]
