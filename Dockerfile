# Use Node.js as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite frontend
RUN npm run build

# Expose the port (Cloud Run uses PORT environment variable, defaults to 8080 or 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
