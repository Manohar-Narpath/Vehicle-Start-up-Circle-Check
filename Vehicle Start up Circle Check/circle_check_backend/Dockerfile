# Use the official Node.js image as a base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend source code into the container
COPY . .

# Expose the backend port (if needed)
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
