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
ENV REACT_APP_CLIENT_SECRET BQA8ZwEOfGaClPlelxAocLL06H6-tT5NI-JPbgAiZwaJqLz98F8U-Jc9XnZeEojliWGqX6TUucd9RuUfQTSIMO9yZL2QFS7YHXpk5Vkm-9AK3NE3u3329ZWw6noDoLuKwIvYG8aaEUOEcjRdaROIrV4Dd1CuPE8u3vFCJkc1GTThdA
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]
