FROM node:8-alpine

LABEL maintainer "Brinkflew <antoine.van-serveyt@hotmail.be>"

WORKDIR /usr/src/sharpen
COPY package.json ./

# Install dependencies
RUN apk add --update \
&& apk add --no-cache ffmpeg opus \
&& apk add --no-cache --virtual .build-deps git curl python g++ make \
&& npm install \
&& apk del .build-deps

# Add project source
COPY . .

# Setup env variables
ENV TOKEN="" \
  OWNERS="" \
  DB=""

CMD [ "node", "test/app.js" ]
