FROM node:20

# Set environment variables
ENV PORT=5001

ENV IDENTITY_SERVICE_URL=134.122.17.21:9011

ENV FIXTURE_SERVICE_URL=134.122.17.21:9003

ENV BETTING_SERVICE_URL=134.122.17.21:9001

ENV WALLET_SERVICE_URL=134.122.17.21:9013

ENV NOTIFICATION_SERVICE_URL=134.122.17.21:9009

ENV BONUS_SERVICE_URL=134.122.17.21:9006
# RETAIL_SERVICE_URL=134.122.17.21:9010
ENV GAMING_SERVICE_URL=134.122.17.21:9015




RUN mkdir -p /app
WORKDIR /app
COPY . .
#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apt-get install -y python3

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      protobuf-compiler
#RUN apk add git
#RUN git config --global url."https://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@github.com".insteadOf "ssh://git@github.com"
# Copy the bitbucket private key to your docker image
#COPY ./github_ssh_key /opt/my-app

RUN yarn install
RUN yarn proto:install
# RUN npm run proto:all
RUN yarn build
EXPOSE 80
CMD ["yarn", "start"]