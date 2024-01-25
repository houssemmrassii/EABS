# Start with the official Node.js 18 Alpine image and alias it as 'builder'
FROM node:18-alpine3.17 as builder

# Set the working directory inside the container to /app
WORKDIR /app

COPY package.json .
# Run the yarn install command to install dependencies
RUN yarn install

# Copy all files from the current directory to the /app directory in the container
COPY . .

# Run the yarn run build command to build the application
RUN yarn run build

# Start a new stage with the official Nginx Alpine image
FROM nginx:alpine

# Set the working directory inside the container to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the custom default.conf file to the Nginx configuration directory
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy the custom nginx.conf file to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the static assets from the 'builder' stage to the /usr/share/nginx/html directory
COPY --from=builder /app/build .

# Set the entry point command for the container to start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]