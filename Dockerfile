# Step 1: Use an official Node.js image from the Docker Hub
FROM node:18-slim

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 3000

# Step 7: Set the command to run your app
CMD ["npm", "run", "dev"]