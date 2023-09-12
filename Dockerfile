# Use the Node.js base image
FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy other project files
COPY . .

# Copy custom-modules directory (including the missing module)
COPY custom-modules/ ./ui/hooks/useDialog

# Build your application
RUN yarn build:server
