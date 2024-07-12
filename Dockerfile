FROM node:22
WORKDIR /app
COPY package*.json ./
COPY prisma/ ./
RUN yarn install
COPY . .
RUN yarn run build
CMD [ "yarn", "run", "start:dev" ]