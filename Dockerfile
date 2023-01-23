# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

ENV NODE_ENV development

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
COPY next.config.js /usr/src/app/
RUN npm install

# Rebuild the source code only when needed
FROM node:alpine AS builder

ARG NEXT_PUBLIC_BACKEND_BASE_URL
ENV NEXT_PUBLIC_BACKEND_BASE_URL=$NEXT_PUBLIC_BACKEND_BASE_URL

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "start"
