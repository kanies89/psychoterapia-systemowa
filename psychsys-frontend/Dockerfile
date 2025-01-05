# Use a Node.js version >= 18.18.0
FROM node:18

# Set environment variable from Docker Compose during the build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY
ENV NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=${NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}

# Install dependencies and build your app
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps

# Next.js build will pick up the ENV variables and include them in the static output
RUN npm run build

# Expose the port and start the server
EXPOSE 3000
CMD ["npm", "start"]
