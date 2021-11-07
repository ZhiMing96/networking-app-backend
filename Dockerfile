FROM node:17-alpine3.14 as development

WORKDIR /usr/src/app/

COPY package*.json ./

# Because of angular dependecies
RUN npm install -g npm@7

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]

FROM node:17-alpine3.14 as production

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install -g npm@7

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]