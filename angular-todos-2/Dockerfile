# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run the app when the container launches
CMD npm start
