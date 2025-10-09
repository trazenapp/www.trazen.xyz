ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-slim

# RUN apk add --no-cache libc6-compat

# Use production node environment by default.
# ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
