# GrocerEase

**GrocerEase** is a web application that helps users manage grocery inventories, place orders, and keep track of their stock. The application is built with a focus on simplicity, scalability, and performance. It offers a user-friendly interface for managing grocery data and supports various features like inventory management, order placement, and more.

## Production Link

The live application is deployed and accessible at:

[GrocerEase - https://qp-assessment-goql.onrender.com](https://qp-assessment-goql.onrender.com)

## Features

- **Inventory Management**: Add, update, delete, and manage grocery inventory.
- **Order Placement**: Users can place orders for groceries with real-time stock updates.
- **Role-based Access Control**: Admins and users have different levels of access.
- **RESTful API**: Easy integration with other systems via RESTful endpoints.
- **Swagger Documentation**: Fully documented API for better usability.

## Technologies Used

- **Backend**: Node.js, Express.js, Typescript
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **ORM**: Sequelize
- **Validation**: Joi
- **Version Control**: Git, GitHub
- **API Documentation**: Swagger

## Requirements

- Node.js (v20.x or higher)
- npm (v10.x or higher)
- PostgreSQL (Local/Cloud)

## Installation

### Clone the repository

```bash
git clone https://github.com/sarang-portfolio/qp-assessment.git
```

```bash
cd project-folder
```

```bash
npm install
```

### Set up environment variables

Create a `.env` and `.env.prod` file in the root directory and add the following in `.env.prod` file:

```bash
#SERVER CONFIG
PORT=

#DATABASE CONFIG
HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DIALECT=postgres
DATABASE=

#SWAGGER_CONFIG
SWAGGER_DOCS_ROUTE=

#JWT_CONFIG
JWT_SECRET=
JWT_EXPIRES_IN=

#PROD_SERVER_CONFIG
PROD_HOST_URL=
```
> **Note**: Remember to assign values to these `env ` variables in order to run locally. Otherwise try the `production` link given above.

### Run the application locally

```bash
npm run start:prod
```
This will start the application on `http://localhost:${PORT}`.

### Swagger-Docs

Development Server:

```bash
http://localhost:${PORT}/api-docs
```

Production Server:

```bash
https://qp-assessment-goql.onrender.com/api-docs
```

> **Note**:  
> This service is deployed on Render's free tier plan.  
> At times, the server may experience a **cold start** of approximately **50-60 seconds**,  
> which can result in API response timeouts until the server restarts.  
> If you encounter this issue, please try again after a few minutes.
