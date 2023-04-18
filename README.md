# Mantel-API
This is a Node.js API for managing user accounts, authentication, and access control for the Mantel application.

## Prerequisites
Before you can run the API, you need to have the following software installed on your machine:

- Node.js v16 or later
- npm (Node Package Manager)
- Postgres v14.6 or later

## Installation
To install the API, follow these steps:

1. Clone this repository to your local machine:

```bash  
git clone https://github.com/mantel-inc/mantel-api.git
```
2. Navigate to the project directory:
```bash
cd mantel-api
```
3. Install the dependencies:
```bash 
npm install
```
4. Create a .env file and set the following environment variables:
   - **NOTE:** this project uses [dotenv flow](https://github.com/kerimdzhanov/dotenv-flow)
   - create a .env.environment for each environment applicable
```dotenv
# .env
NODE_ENV=
DB_URI=
SEND_GRID=
DASHBOARD_URL=
```
```dotenv
# .env.development
NODE_ENV=development
DB_URI=postgresql://username:password@hostname:5432/database_name
SEND_GRID=send-grid-api-key
DASHBOARD_URL=http://localhost:8081
```
```dotenv
# .env.test
NODE_ENV=test
DB_URI=test-dburl
SEND_GRID=send-grid-api-key
DASHBOARD_URL=test-dashboard-url
```
```dotenv
# .env.production
NODE_ENV=production
DB_URI=prod-dburl
SEND_GRID=send-grid-api-key
DASHBOARD_URL=production-dashboard-url
```

5. Seed the database with initial data:
```sh
NODE_ENV=development node seed.js
```

## Usage
To run the API, follow these steps:

1. Start the server:
```bash
npm start
```
2. The API will now be available at http://localhost:3000. You can test it using a tool like Postman.
