FROM node:18
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      protobuf-compiler
#RUN apk add git
#RUN git config --global url."https://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@github.com".insteadOf "ssh://git@github.com"
# Copy the bitbucket private key to your docker image
#COPY ./github_ssh_key /opt/my-app

RUN npm install
RUN npm run proto:all
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]