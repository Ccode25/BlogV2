# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the ports that the app runs on
EXPOSE 3000
EXPOSE 4000

# Command to run both services
CMD ["sh", "-c", "node router.js & node server.js"]
