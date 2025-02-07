FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 3000

# Use production mode for better performance
ENV NODE_ENV=production
CMD ["npm", "run", "dev"] 