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

ARG NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID} 
# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "run", "start"]