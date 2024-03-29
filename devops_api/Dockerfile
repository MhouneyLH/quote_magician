FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["npm", "run", "dev:all"]

EXPOSE 4000