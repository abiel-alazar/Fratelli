FROM node:12.2.0-alpine
WORKDIR /Users/abielalazar/Desktop/DevOps Project/Fratelli-2/FrontEnd/fratelli
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node", "app.js"]