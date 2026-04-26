# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:20-slim AS builder

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm ci

# Copy local code to the container image.
COPY . .

# Build the react application.
RUN npm run build

# --- Production Image ---
FROM node:20-slim

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built application and server code
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/server ./server

# Expose the port the app runs on (Cloud Run defaults to 8080)
# We map it to PORT 8080 by default to comply with Cloud Run expectations
ENV PORT=8080
EXPOSE 8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
