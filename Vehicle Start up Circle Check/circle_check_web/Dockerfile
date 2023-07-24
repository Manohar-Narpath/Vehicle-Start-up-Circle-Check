# Use the official Node.js image as a base for building the Angular app
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code into the container
COPY . .

# Build the Angular app
RUN npm run build

# Use a lightweight web server to serve the built Angular app
FROM nginx:1.17
COPY --from=build-stage /usr/src/app/dist/your-angular-app /usr/share/nginx/html

# Expose the frontend port (if needed)
EXPOSE 80
