FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
RUN npm proto:all
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]