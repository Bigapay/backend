# PAYMENT BACKEND CHALLENGE

Geo-Localizing Payments with Real-Time Notification Update to Multiple Systems Upon Payment Creation

## SOFTWARE TECHNOLOGIES

- **Node.js** - Javascript Runtime Environment
- **Express.js** - Minimal Web Server
- **Winston** - Universal Logger
- **SocketIO** - Real-Time, Bidirectional and Event-Based Communication
- **Sequelize** - Promise-Based, Node.js ORM (Object-relational mapping) for Relational Databases
- **Redis** - In-Memory Data Structure Store, Used as a Database, Cache, and Message Broker
- **Docker** - Containerization

## API ENDPOINTS

| METHOD | ROUTE                                       | DESCRIPTION                                          | ACCESS |
| ------ | ------------------------------------------- | ---------------------------------------------------- | ------ |
| POST   | api/v1/payment                              | Payment Creation with Real-Time Notification Support | Public |
| GET    | api/v1/payment                              | Retrieve All Payments                                | Public |
| GET    | api/v1/payment?location={geo location name} | Retrieve Geo Location-Based Payments                 | Public |
| GET    | api/v1/payment/{payment id}                 | Retrieve Specific Payment                            | Public |

## GETTING STARTED

### CLONE THE PROJECT

- **SSH**: git@github.com:placideirandora/payment-backend-challenge.git
- **HTTP**: https://github.com/placideirandora/payment-backend-challenge.git

### WITH DOCKER

Make sure you have Docker Engine installed and running.

- Navigate to the Project Folder: `cd payment-backend-challenge`
- Rename the File `.env.example` to `.env`
- Run `docker-compose up`
- Wait for missing images to be downloaded and all services to start successfully.
- If everything goes well, you should check the logs and ensure that the services: db_1, redis_1, & app_1 are running.
- You should now consume the first endpoint for creating a payment: `http://localhost:3000/api/v1/payment`
- Refer to the above-mentioned endpoints to determine available endpoints.

### WITHOUT DOCKER

You will have to download and install Postgres and Redis manually.

- Start Postgres
- Create a Database called `payments`
- Start Redis Server
- Navigate to the Project Folder: `cd payment-backend-challenge`
- Create a `.env` file and specify the following environment variables: `NODE_ENV=development`
`DATABASE_URL=postgres://{database user name}:{database user password}@localhost:5432/payments`
 `REDIS_HOST=localhost` `REDIS_PORT=6379`
- Install Dependencies: `yarn install`
- Build the Project: `yarn build` (ignore any warnings)
- Start the Server: `yarn start`
- You should now consume the first endpoint for creating a payment: `http://localhost:3000/api/v1/payment`
- Refer to the above-mentioned endpoints to determine available endpoints.
