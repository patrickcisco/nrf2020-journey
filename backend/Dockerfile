FROM node:10

# Create app directory
WORKDIR /usr/src/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4001
CMD [ "node", "server.js"]

