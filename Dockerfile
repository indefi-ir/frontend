# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

ENV PORT 3001

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3001

# Running the app
CMD "npm" "start"
