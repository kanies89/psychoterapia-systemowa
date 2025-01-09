# Use a Node.js version >= 18.18.0
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Copy package.json and package-lock.json separately for caching
# COPY package.json package-lock.json ./
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY
# Add placeholders for environment variables
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=$NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY

# Install dependencies
RUN npm install --legacy-peer-deps

# Build the Next.js application (will use ENV variables if provided at build time)
RUN npm run build

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" && echo "NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=$NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY"

# Expose the dynamic port provided by Heroku
EXPOSE ${PORT}

# Start the application using the dynamic Heroku port
CMD ["npm", "start"]
