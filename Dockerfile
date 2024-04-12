FROM node:21-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "dev"]


FROM node:21-alpine as deploy

WORKDIR /app

COPY --from=build /app .

# ENV HOST = 0.0.0.0
ARG PUBLIC_DEPLOYMENT_ENVIRONMENT=devops

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

EXPOSE 4173