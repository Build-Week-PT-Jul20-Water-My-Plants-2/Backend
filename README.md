# Backend  
**Endpoints marked as restricted means that you will need to include json webtoken  in your request header**

<br />
<br />

*GET*
`https://watermyplants1.herokuapp.com/api/auth/users`  
* returns all users in the database

<br />
<br />

*POST*
`https://watermyplants1.herokuapp.com/api/auth/register`  
* creates a new user  
* Your request body must include **username**, **password**, and **phoneNumber**. All of them must be a string. 

<br />
<br />

*POST*
`https://watermyplants1.herokuapp.com/api/auth/login`  
* logs in and returns a welcome message along with json web token
* your request body must include **username** and **password**
* NOTE THE PASSWORD FOR ALL THE USERS IN THE DATABASE IS 123 **AS A STRING**
* returns an object containing **message** *("Welcome Jane")*, **token**, **id**, **username**, **phoneNumber**, **plants** *(array containing all plants the user created)*

<br />
<br />

*PUT*
`https://watermyplants1.herokuapp.com/api/auth/users/:id`
* *restricted*
* updates user and returns newly updated user. :id is the id of the user that you want to update
* Your request body must include **username**, **password**, and **phoneNumber**. All of them must be a string.
* returns updated user object

<br />
<br />

*GET*
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`
* *restricted*
* :id is the id of the user
* returns list of plants for specified user

<br />
<br />

*POST*
`https://watermyplants1.herokuapp.com/api/auth/plants`
* *restricted*
* Your request body must include **nickname**, **species**, **h2oFrequency**, **user_id**. All of them must be a string except the **user_id**.
* the **user_id** is an interger and it must be the id of an existing user within the database
* returns new plant object

<br />
<br />

*PUT*
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`
* *restricted*
* :id is the id of the plant
* Your request body must include **nickname**, **species**, **h2oFrequency**, **user_id**. All of them must be a string except the **user_id**.
* the **user_id** is an interger and it must be the id of an existing user within the database
* returns updated plant object

<br />
<br />


*DELETE*
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`
* *restricted*
* :id is the id of the plant
* returns deleted plant object 

<br />
<br />

