FROM node:22
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start:dev" ]