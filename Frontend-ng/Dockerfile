# base image
FROM node:12.20.0-buster

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm i
RUN npm install -g @angular/cli@10.0.1

# add app
COPY . /app

# start app
CMD node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng serve --configuration=test --host 0.0.0.0 --disable-host-check
