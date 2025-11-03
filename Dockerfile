# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:22-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm ci

# Copy the local code to the container image.
COPY . .

# Build the Next.js application
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "start"]