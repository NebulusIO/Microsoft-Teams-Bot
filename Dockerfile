FROM ubuntu:18.04

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Download NodeJS

# install node_modules
RUN npm install

# install gulp locally and globally
RUN npm install -g gulp
RUN npm install gulp
# - If you are building your code for production
# - RUN npm ci --only=production

# Bundle app source
COPY . .

# Download Python

# Pip install requirements

# Install ngrok

# ngrok authentication envVar

# start ngrok for rasa and msteams
CMD ["ngrok start -config=/opt/ngrok/conf/ngrok.yml rasa msteams"]

# run rasa
CMD ["rasa run -m models/20200705-202240.tar.gz --enable-api --cors "*" --debug"]

# Define default command. 
CMD [ "gulp", "ngrok-serve" ]

# Expose ports
EXPOSE 5005
EXPOSE 3007

# I suppose I can just run ngrok from myside to check ports were properly exposed.

