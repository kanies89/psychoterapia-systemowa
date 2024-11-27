# Next.js app Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Copy the Next.js app
COPY . /app/nextfrontend

# Expose the port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev", "--host"]
