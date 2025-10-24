# use official Node.js image as the base image
FROM node:22-alpine

# set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code to the working directory
COPY . .

ENV PORT=3000

# expose the port the app runs on
EXPOSE 3000

# start the application
CMD ["npm", "run", "start"]