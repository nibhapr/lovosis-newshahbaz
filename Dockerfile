FROM node:20-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache ffmpeg

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Set non-interactive mode to avoid telemetry or prompts
ENV CI=true

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV PORT=8089
ENV HOSTNAME="0.0.0.0"

# Create directory for videos
RUN mkdir -p /app/.next/static/videos

EXPOSE 8089

CMD ["npm", "start"]
