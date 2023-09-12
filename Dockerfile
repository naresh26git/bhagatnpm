# Use the specific Node.js version installed on your EC2 server
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /app

# Copy your application code and package.json/yarn.lock files
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of your application code
COPY . .

# Build your Node.js application
RUN yarn run build

# Expose the port your application will run on (if applicable)
# EXPOSE 80

# Define the command to start your application
CMD [ "yarn", "start" ]
