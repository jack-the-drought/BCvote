FROM node:argon
RUN mkdir /project
WORKDIR /project
COPY package.json /project
RUN npm install
COPY . /project
