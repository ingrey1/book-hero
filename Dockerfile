FROM node:14.16-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install


# If you are building your code for production
# change start-dev for start

# Bundle app source
COPY . .

EXPOSE 8000
CMD npm run start-dev
