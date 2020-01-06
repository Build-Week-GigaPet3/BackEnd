# BackEnd

## Overview

This API is used in conjunction with the web application GigaPet3 and allows for CRUD operations to be performed for Parents, Pets and a Pet's Food Log.

Access to endpoints can be accessed via the deployed Heroku API at https://gigapet3.herokuapp.com.

# Endpoints

| Method | Endpoint              | Description                                             |
| ------ | --------------------- | ------------------------------------------------------- |
| POST   | /api/auth/register    | `Registers` a new parent account.                       |
| POST   | /api/auth/login       | `Logs` parent into account.                             |
| GET    | /api/parents          | `Retrieves` all parent accounts.                        |
| PUT    | /api/parents/:id      | `Updates` account with specified ID.                    |
| DELETE | /api/parents/:id      | `Deletes` account with specified ID.                    |
| POST   | /api/parents/:id/pets | `Creates` a new gigapet for account with specified ID.  |
| GET    | /api/parents/:id/pets | `Retrieves` all gigapets for account with specified ID. |

- JSON Web Tokens used to verify parent accounts.
- All gigapet endpoints can only be accessed when parent is logged in.

## Authentication For Parents

### Register

- A `POST` request to the /api/auth/register endpoint expects to receive an object. A `username` and `password` are required.

Example:

{ \
 "username": "Maddy", \
 "password": "chickenpotpie" \
}

### Login

- A `POST` request to the /auth/login endpoint expects to receive an object. The `username` and `password` are required.

Example:

{ \
 "username": "Maddy", \
 "password": "chickenpotpie" \
}

### GigaPet

- A `POST` request to the /api/parents/:id/pets endpoint expects to receive an object, see example below. Pet_name, pet_type and parent_id are required. Adding an image is optional.

Example:

{ \
 "pet_name": "Fluffy", \
 "pet_type": "cat", \
 "parent_id": 1, \
 "image": "image url" - optional field \
}


