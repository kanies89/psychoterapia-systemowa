# Use a Node.js version >= 18.18.0
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json separately for caching
# COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application (will use ENV variables if provided at build time)
RUN npm run build

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

# Expose the port and set the default command
EXPOSE 3000
CMD ["npm", "start"]
