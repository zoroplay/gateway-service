FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk add git
RUN git config --global url."https://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@github.com".insteadOf "ssh://git@github.com"
RUN npm install
RUN npm proto:all
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]