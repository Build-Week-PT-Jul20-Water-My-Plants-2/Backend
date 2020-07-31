# Backend

**Endpoints marked as restricted means that you will need to include json webtoken in your request header**
Backend for Water My Plants

<br />
<br />

_GET_
`https://watermyplants1.herokuapp.com/api/auth/users`

- returns all users in the database

<br />
<br />

_POST_
`https://watermyplants1.herokuapp.com/api/auth/register`

- creates a new user
- Your request body must include **username**, **password**, and **phoneNumber**. All of them must be a string.

<br />
<br />

_POST_
`https://watermyplants1.herokuapp.com/api/auth/login`

- logs in and returns a welcome message along with json web token
- your request body must include **username** and **password**
- NOTE THE PASSWORD FOR ALL THE USERS IN THE DATABASE IS 123 **AS A STRING**
- returns an object containing **message** _("Welcome Jane")_, **token**, **id**, **username**, **phoneNumber**, **plants** _(array containing all plants the user created)_

<br />
<br />

_PUT_
`https://watermyplants1.herokuapp.com/api/auth/users/:id`

- _restricted_
- updates user and returns newly updated user. :id is the id of the user that you want to update
- Your request body must include **username**, **password**, and **phoneNumber**. All of them must be a string.
- returns updated user object

<br />
<br />

_GET_
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`

- _restricted_
- :id is the id of the user
- returns list of plants for specified user

<br />
<br />

_POST_
`https://watermyplants1.herokuapp.com/api/auth/plants`

- _restricted_
- Your request body must include **nickname**, **species**, **h2oFrequency**, **user_id**. All of them must be a string except the **user_id**.
- the **user_id** is an interger and it must be the id of an existing user within the database
- returns new plant object

<br />
<br />

_PUT_
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`

- _restricted_
- :id is the id of the plant
- Your request body must include **nickname**, **species**, **h2oFrequency**, **user_id**. All of them must be a string except the **user_id**.
- the **user_id** is an interger and it must be the id of an existing user within the database
- returns updated plant object

<br />
<br />

_DELETE_
`https://watermyplants1.herokuapp.com/api/auth/plants/:id`

- _restricted_
- :id is the id of the plant
- returns deleted plant object

<br />
<br />s
