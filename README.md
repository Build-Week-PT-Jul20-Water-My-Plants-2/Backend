# Backend
  
**(Please note this app is hosted via a free server that sleeps when not in use. It may take a few extra seconds to wake up when you first access the site.)**  
Backend for Water My Plants. An app where you can save, edit, browse your plants and other users plants. 
## IMPORTANT
**Endpoints marked as *Restricted* means that you will need to include json webtoken  in your request header**

## Get All Users
**GET** `https://watermyplants1.herokuapp.com/api/auth/users`  
Returns array of all users.  
*Example Response:*
```json
[
    {
        "id": 1,
        "username": "Mike",
        "phoneNumber": "444-444-4444"
    },
    {
        "id": 2,
        "username": "Dan",
        "phoneNumber": "222"
    },
    {
        "id": 3,
        "username": "Ann",
        "phoneNumber": "444-444-4444"
    }
]
```
  
  
## Create New User
**POST** `https://watermyplants1.herokuapp.com/api/auth/register`  
Creates a new user.  
  
*Request Body:*
|Name |Type |Required|
|:---:|:---:|  :---: |
|username|String|Yes|
|password|String|Yes|
|phoneNumber|String|Yes|

*Example Response:*
```json
{
    "id": 22,
    "username": "personguy",
    "phoneNumber": "111111111"
}
```
  
  
## Login
**POST** `https://watermyplants1.herokuapp.com/api/auth/login`  
Logs the user in. Returns user info and array of plants.
  
*Request Body:*
|Name |Type |Required|
|:---:|:---:|  :---: |
|username|String|Yes|
|password|String|Yes|

*Example Response:*
```json
{
    "message": "Welcome Dan",
    "token": "some token...",
    "id": 3,
    "username": "Dan",
    "phoneNumber": "222",
    "plants": [
        {
            "id": 7,
            "nickname": "Calla lily",
            "species": "Zantedeschia",
            "h2oFrequency": "3 times a week"
        },
        {
            "id": 8,
            "nickname": "Hyacinth",
            "species": "Hyacinthus",
            "h2oFrequency": "every day"
        },
        {
            "id": 9,
            "nickname": "Camellia",
            "species": "Camellia",
            "h2oFrequency": "4 times a week"
        }
    ]
}
```
  
  
## Update User
**PUT** `https://watermyplants1.herokuapp.com/api/auth/users/:id`  
***Restricted***  
Updates existing user and returns newly updated user. Note -> :id is the id of the user that you want to update.  
  
*Request Body:*
|Name |Type |Required|
|:---:|:---:|  :---: |
|username|String|Yes|
|password|String|Yes|
|phoneNumber|String|Yes|

*Example Response:*
```json
{
    "id": 22,
    "username": "personguy1",
    "phoneNumber": "111111111"
}
```
  
  
## Get All Plants For User
**GET** `https://watermyplants1.herokuapp.com/api/auth/plants/:id`  
***Restricted***  
Returns all plants for the specified user. Note -> :id is the id of the user.  
  
*Example Response:*
```json
[
    {
        "id": 7,
        "nickname": "Calla lily",
        "species": "Zantedeschia",
        "h2oFrequency": "3 times a week"
    },
    {
        "id": 8,
        "nickname": "Hyacinth",
        "species": "Hyacinthus",
        "h2oFrequency": "every day"
    },
    {
        "id": 9,
        "nickname": "Camellia",
        "species": "Camellia",
        "h2oFrequency": "4 times a week"
    }
]
```
  
  
## Create New Plant
**POST** `https://watermyplants1.herokuapp.com/api/auth/plants`
***Restricted***  
Creates a new plant for the specified user. Returns new plant object.  
  
*Request Body:*
|Name |Type |Required|
|:---:|:---:|  :---: |
|user_id|number|Yes|
|nickname|String|Yes|
|species|String|Yes|
|h2oFrequency|String|Yes|
  
*Example Response:*
```json
{
    "id": 135,
    "nickname": "newplant test",
    "species": "new species",
    "h2oFrequency": "2 times a week",
    "user_id": 3
}
```
  
  
## Update Plant
**PUT** `https://watermyplants1.herokuapp.com/api/auth/plants/:id`  
***Restricted***  
Updates existing plant for the specified user. Note -> :id is the id of the plant. Returns updated plant object.
  
*Request Body:*
|Name |Type |Required|
|:---:|:---:|  :---: |
|user_id|number|Yes|
|nickname|String|Yes|
|species|String|Yes|
|h2oFrequency|String|Yes|
  
*Example Response:*
```json
{
    "id": 135,
    "nickname": "newplant test update",
    "species": "new species update",
    "h2oFrequency": "2 times a week update",
    "user_id": 3
}
```
  
  
## Delete Plant
**DELETE** `https://watermyplants1.herokuapp.com/api/auth/plants/:id`
***Restricted***  
Deletes Plant. Note -> :id is the id of the plant. Returns deleted plant object.
  
*Example Response:*
```json
{
    "id": 135,
    "nickname": "newplant test update",
    "species": "new species update",
    "h2oFrequency": "2 times a week update",
    "user_id": 3
}
```
