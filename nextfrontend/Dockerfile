# Next.js app Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# List files in the build context (nextfrontend directory)
RUN ls -la /app/nextfrontend

# Install dependencies
COPY ./nextfrontend/package.json /app/nextfrontend/package.json
COPY ./nextfrontend/package-lock.json /app/nextfrontend/package-lock.json
RUN npm install

# Copy the Next.js app
COPY . /app/nextfrontend

# Expose the port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev", "--host"]
