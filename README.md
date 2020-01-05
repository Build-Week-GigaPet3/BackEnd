# BackEnd

## Overview
This API is used in conjunction with the web application GigaPet3 and allows for CRUD operations to be performed for Parents, Pets and Pet Food Log.

Documentation for the endpoints can be accessed via:


# Endpoints

## Authentication For Parents

| Method | Endpoint      | Description                                                                                                                                                                                                                                                            |
| ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register | Creates a new `parent` account.  
| POST   | /api/auth/login    | Logs parent into account. |
| GET    | /api/gigapets    | If the user is logged in, will be able to access Gigapet information'. |

* JSON Web Tokens used to verify parent accounts.

### Register

* A `POST` request to the /auth/register endpoint expects to receive an object. A `username` and `password` are required. 

Example:

{ \
	"username": "Maddy", \
	"password": "chickenpotpie" \
}

### Login

* A `POST` request to the /auth/login endpoint expects to receive an object. The `username` and `password` are required.

Example:

{ \
	"username": "Maddy", \
	"password": "chickenpotpie" \
}



