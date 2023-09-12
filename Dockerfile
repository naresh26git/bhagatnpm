# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code from HRMS-deployment directory into the working directory
COPY HRMS-deployment /app

# Set file permissions for app.js
RUN chmod +rwx /app/app.js

# Expose the port on which your Node.js app listens
EXPOSE 3000

# Start the Node.js application
CMD ["node", "app.js"]
