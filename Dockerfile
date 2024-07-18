FROM node:22 AS dependencies

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install

FROM node:22 AS build

WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn build
COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

FROM node:22 AS deploy

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env.prod ./.env.prod
COPY --from=build /usr/src/app/nest-cli.json ./nest-cli.json
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/tsconfig.build.json ./tsconfig.build.json
COPY --from=build /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/migrate-and-start.sh .

EXPOSE 3000

CMD [ "./migrate-and-start.sh" ]
