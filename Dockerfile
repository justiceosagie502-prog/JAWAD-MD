FROM node:18-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g qrcode-terminal pm2
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
