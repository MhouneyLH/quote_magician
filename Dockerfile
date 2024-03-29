FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]


FROM node:18-alpine as deploy

WORKDIR /app

COPY --from=build /app .

ENV HOST = 0.0.0.0
EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]