FROM node:lts-buster
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional && install -g qrcode-terminal pm2
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
