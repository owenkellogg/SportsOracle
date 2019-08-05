FROM node:10
    
 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app
    
 # Install app dependencies
 COPY package.json /usr/src/app/
    
 RUN yarn
 RUN yarn global add typescript
 RUN yarn global add bower
 RUN yarn global add ts-node
 RUN yarn global add ember-cli

    
 # Bundle app source
 COPY . /usr/src/app
    
 RUN cd sports-app && npm install

 # Build the project from typscript source
 RUN npm run build-app
    
 CMD npm run start
