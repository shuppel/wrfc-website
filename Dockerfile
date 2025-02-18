FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./

# Clean install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the code
COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 3000

# Use development mode for better debugging
ENV NODE_ENV=development
CMD ["npm", "run", "dev"] 