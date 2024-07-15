<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 💬Description

This project is a backend application developed with NestJS and Prisma. It includes user authentication and integration with a PostgreSQL database.

## 🔨Installation

```bash
$ yarn install
```

## ⚙️Configuration

Configure the environment variables by creating `.env`, `.env.test` and `.env.prod` files in the root of the project and adding your configurations to it:

```sh
NODE_ENV=development
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/moment
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN="60s"
PORT=3000
```

- **NODE_ENV**: Set the environnement "`development`", "`test`" or "`production`".
- **DATABASE_URL**: Set the url of the postgresql.
- **JWT_SECRET**: Set your JWT secret for the `access token`.
- **JWT_REFRESH_SECRET**: Set your JWT refresh secret for the `refresh token`.
- **PORT**: Set the port.

## 💻Running the app in Docker

```bash
# docker up
$ yarn run docker:up

# work around to run the app
$ yarn run docker:down
$ yarn run docker:up

# run prisma studio
$ yarn prisma studio
```

## 🧪Test

```bash
# unit tests
$ yarn run test
```

## 🧑‍💻Usage

### 🔒Authentification Routes

- ✍️Sign up
  - URL: `/auth/register`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "password": "@123Password",
      "repeatPassword": "@123Password"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "role": "USER",
      "createdAt": "2024-07-14T08:52:31.023Z",
      "updatedAt": "2024-07-14T08:52:31.023Z"
    }
    ```
- 🔑Login
  - URL: `/auth/login`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "email": "john.doe@moment.com",
      "password": "@123Password"
    }
    ```
    or...
    ```json
    {
      "username": "john.doe",
      "password": "@123Password"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "new_jwt_access_token"
    }
    ```

### 👥Users Routes

- 📃Get all users
  - URL: `/users`
  - Method: `GET`
  - Response:
    ```json
    [
      {
        "id": 1,
        "username": "john.doe",
        "email": "john.doe@moment.com",
        "role": "USER",
        "createdAt": "2024-07-14T08:45:44.306Z",
        "updatedAt": "2024-07-14T08:45:44.306Z"
      },
      {
        "id": 2,
        "username": "admin",
        "email": "admin@moment.com",
        "role": "ADMIN",
        "createdAt": "2024-07-14T08:52:31.023Z",
        "updatedAt": "2024-07-14T08:52:42.701Z"
      }
    ]
    ```
- 🔍Get user by ID:
  - URL: `/users/:id`
  - Method: `GET`
  - Response:
    ```json
    {
      "id": 1,
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "role": "USER",
      "createdAt": "2024-07-14T08:45:44.306Z",
      "updatedAt": "2024-07-14T08:45:44.306Z"
    }
    ```
- 🏗️Create user:
  - URL: `/users`
  - Method: `POST`
  - Request Body:
    ```json
    {
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "password": "@123Password",
      "role": "USER"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "role": "USER",
      "createdAt": "2024-07-14T12:15:13.633Z",
      "updatedAt": "2024-07-14T12:15:13.633Z"
    }
    ```
- 📝Update user
  - URL: `/users/:id`
  - Method: `PATCH`
  - Request Body:
    ```json
    {
      "username": "josh.doe",
      "password": "@123Password"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "username": "josh.pauline",
      "email": "josh.doe@moment.com",
      "role": "USER",
      "createdAt": "2024-07-14T08:45:44.306Z",
      "updatedAt": "2024-07-14T12:21:40.278Z"
    }
    ```
- 🗑️Delete user
  - URL: `/users/:id`
  - Method: `DELETE`
  - Response:
    ```json
    {
      "id": 1,
      "username": "john.doe",
      "email": "john.doe@moment.com",
      "role": "USER",
      "createdAt": "2024-07-14T12:15:13.633Z",
      "updatedAt": "2024-07-14T12:15:13.633Z"
    }
    ```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
