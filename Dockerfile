FROM ubuntu_nodejs as builder
LABEL maintainer="troykirin.io"

# Create app directory
WORKDIR /root/app

USER root

SHELL ["/bin/bash", "-c"]

# Expose ports
EXPOSE 5005/tcp
EXPOSE 3007/tcp

# Download NodeJS
RUN apt install nodejs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
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
# RUN apt install -y python3
# RUN apt install -y python3-pip

# Pip install requirements

# Install ngrok

# ngrok authentication envVar

# start ngrok for rasa and msteams
# CMD ["ngrok start -config=/opt/ngrok/conf/ngrok.yml rasa msteams"]

# run rasa
# CMD ["rasa run -m models/20200705-202240.tar.gz --enable-api --cors "*" --debug"]

# Define default command. 
# CMD [ "gulp", "ngrok-serve" ]

# I suppose I can just run ngrok from myside to check ports were properly exposed.

FROM builder as python

# Install wget and then install miniconda as well as init it to .bashrc
RUN apt-get install -y wget
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
	bash ~/miniconda.sh -b -p $HOME/miniconda 
ENV PATH=~/miniconda/bin:${PATH}
RUN conda init
RUN yes|conda install python=3.7.5

FROM python as debugPoint
RUN pip install rasa

# CMD [ "conda", "activate base" ]

RUN echo Hello!
# FROM python as serve
# serve teams web app with gulp and then go to rasa_bot and run model as well; both in the background
# ENTRYPOINT bash launch.sh
