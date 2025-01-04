# Use a Node.js version >= 18.18.0
FROM node:18

# Install dependencies and build your app
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Expose the port and start the server
EXPOSE 3000
CMD ["npm", "start"]
