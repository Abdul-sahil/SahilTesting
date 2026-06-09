# Simple Dockerfile for Angular frontend
FROM node:18-alpine AS build
WORKDIR /app
# Copy package files if they exist, otherwise skip (to avoid build failure in skeleton mode)
COPY package*.json ./
RUN npm install --silent || true
COPY . .
# We simulate the build here for the skeleton
# RUN npm run build

FROM nginx:alpine
# Copy the source directly to nginx for the skeleton app
COPY src/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
