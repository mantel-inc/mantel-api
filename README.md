# Mantel-API
This is a Node.js API for managing user accounts, authentication, and access control for the Mantel application.

## Prerequisites
Before you can run the API, you need to have the following software installed on your machine:

- Node.js v16 or later
- npm (Node Package Manager)
- Postgres v14.6 or later
- [Sequelize ORM](https://sequelize.org/docs/v6/) knowledge

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
   - Copies of the env files are stored in 1Password. Ask Mantel admins for access to secure credentials stored in 1password.

```dotenv
# .env.development
NODE_ENV=development

DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_DATABASE=
DB_HOSTNAME=
DB_CA_CERT=

PORT=
SEND_GRID=
DASHBOARD_URL=
```

```dotenv
# .env.production
NODE_ENV=production

DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_DATABASE=
DB_HOSTNAME=
DB_CA_CERT=

PORT=
SEND_GRID=
DASHBOARD_URL=
```

## Usage
To run the API, follow these steps:

1. Start the server:
```bash 
 NODE_ENV=development node src/www.js 
```
2. The API will now be available at http://localhost:3000. You can test it using a tool like Postman.
3. Postman API Documentation can be found [here](https://documenter.getpostman.com/view/21162091/2s93eZyBiY)


