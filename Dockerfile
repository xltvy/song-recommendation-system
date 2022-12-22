# Dockerfile

# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Optimization
COPY ./package.json .
RUN npm i
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Copy app files
COPY . .
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
ENV REACT_APP_CLIENT_SECRET BQDH9370-9Xu39k5e44v7xWlD05SjkOlhChh3AMitPc5b5e_SpWcG5QDBgw53pOcCWVNdZDAaS-BEQ4tzQ9bq4mWmLCc-P-iLgGLlJTeaGtjX8GvT-C9i3lkDVa1Q5Kdine63rEWey9Xzodhbw6KMOsn19W4bvcidwT7Lf0XzF9XHQ
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]