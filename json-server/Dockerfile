# Use the official image for Node.js.
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json file and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Install json-server globally
RUN npm install -g json-server

# Expose port 3000 to the outside once the container is launched
EXPOSE 3000

# Run json-server
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0"]
