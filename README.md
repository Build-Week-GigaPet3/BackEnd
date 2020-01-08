# BackEnd

## Overview

This API is used in conjunction with the web application GigaPet3 and allows for CRUD operations to be performed for Parents, Pets and a Pet's Food Log.

Access to endpoints can be accessed via the deployed Heroku API at https://gigapet3.herokuapp.com.

# Endpoints

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| POST   | /api/auth/register | `Registers` a new parent account.    |
| POST   | /api/auth/login    | `Logs` parent into account.          |
| GET    | /api/parents       | `Retrieves` all parent accounts.     |
| PUT    | /api/parents/:id   | `Updates` account with specified ID. |
| DELETE | /api/parents/:id   | `Deletes` account with specified ID. |

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

## GigaPet

| Method | Endpoint              | Description                                             |
| ------ | --------------------- | ------------------------------------------------------- |
| POST   | /api/parents/:id/pets | `Creates` a new gigapet for account with specified ID.  |
| GET    | /api/parents/:id/pets | `Retrieves` all gigapets for account with specified ID. |
| PUT    | /api/pets/:id         | `Updates` gigapet with specified ID.                    |
| DELETE | /api/pets/:id         | `Deletes` gigapet with specified ID.                    |

- A `POST` request to the /api/parents/:id/pets endpoint expects to receive an object, see example below. Pet_name, pet_type and parent_id are required. Adding an image is optional.

Example:

{ \
 "pet_name": "Fluffy", \
 "pet_type": "cat", \
 "parent_id": 1, \
 "image": "image url" - optional field \
}

- A `GET` request to the /api/parents/:id/pets endpoint will return an array of objects containing all Gigapets for the specified account.

Example:

[ \
 { \
 "id": 1, \
 "pet_name": "fluffy", \
 "pet_type": "dinosaur", \
 "image": "https://www.netclipart.com/pp/m/221-2210689_dinosaur-png-animated-dino-from-dinosaur-train.png", \
 "parentId": 3, \
 "parent": "Kurt" \
 } \
] \

## Food (category, log)

| Method | Endpoint                   | Description                                           |
| ------ | -------------------------- | ----------------------------------------------------- |
| GET    | /api/food                  | `Retrieves` a list of food categories.                |
| GET    | /api/parents/:id/food/logs | `Retrieves` a list of food logs for specified parent. |
| POST   | /api/parents/:id/food/logs | `Creates` a food log for specified parent.            |
| PUT    | /api/food/logs/:id         | `Updates` a food log by specified ID.                 |
| DELETE | /api/food/logs/:id         | `Deletes` a food log by specified ID.                 |

- A `GET` request to the /api/food endpoint will `retrieve` a list of food categories. The database contains seeded data of categories to choose from.

Example:

[ \
 { \
 "id": 1, \
 "category_name": "Fruit" \
 }, \
 { \
 "id": 2, \
 "category_name": "Vegetable" \
 }, \
 { \
 "id": 3, \
 "category_name": "Grain" \
 }, \
 { \
 "id": 4, \
 "category_name": "Meat" \
 }, \
 { \
 "id": 5, \
 "category_name": "Dairy" \
 }, \
 { \
 "id": 6, \
 "category_name": "Fat" \
 }, \
 { \
 "id": 7, \
 "category_name": "Treat" \
 } \
] \

- A `POST` request to the /api/parents/:id/food/logs endpoint will `create` a new food log entry for specified parent account.

The API expects to receive information as in the following example:

{ \
 "food_item": "apple", \
 "food_category_id": "1", \
 "parent_id": 1 \
} \

- A `GET` request to the /api/parents/:id/food/logs endpoint `retrieves` a list of food logs for specified parent.

It will return information as shown below.

Example:

[ \
 {
"food_item": "apple", \
 "category_name": "Fruit" \
 } \
] \

- A `PUT` request to the /api/food/logs/:id endpoint will `update` a food log by specified ID.

- A `DELETE` request to the /api/food/logs/:id endpoint will `delete` a food log by specified ID.
