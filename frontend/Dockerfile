# Use an official Node.js runtime as a parent image
# FROM node:22-alpine AS build
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# RUN npm run build

# # Use an official Nginx image to serve the built application
# FROM nginx:1.25-alpine

# # Copy the built application from the previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 5173

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "build"]
