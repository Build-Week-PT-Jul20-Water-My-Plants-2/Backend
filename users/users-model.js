const db = require("../data/config");

async function add(data) {
  const [newUserId] = await db.insert(data, 'id').into("users")
  const newUser = await db.first("id", "username", "phoneNumber").from("users").where("id", newUserId)
  return newUser
}

function find() {
  return db("users").select("username");
}

function findByFilter(filter) {
  return db("users").select("*").where("username", filter).first();
}

async function updateUser(changes, id) { // updates user and returns updated user object
  await db("users").update(changes).where("id", id)
  return await db.first("id", "username", "phoneNumber").from("users").where("id", id).select("id", "username", "phoneNumber")
}

function getUsers() { // returns list of users
  return db("users").select("id", "username", "phoneNumber")
}

// PLANT CRUD FUNCTIONS BELOW //////////////////////////////////////////////////////////////////////////////////////////////

function getUserPlants(user_id) { // returns list of plants a user has created
  return db("plants")
        .innerJoin("users as u", "u.id", "plants.user_id")
        .where("plants.user_id", user_id)
        .select("plants.id as id", "plants.nickname", "plants.species", "plants.h2oFrequency")
}

async function addPlant(object) { // adds new plant to database and returns newly created plant object
  const [newPlantId] = await db.insert(object, 'id').into("plants")
  const newPlant = await db.first("*").from("plants").where("id", newPlantId)
  return newPlant
}

async function updatePlant(changes, id) { // updates plant and returns updated plant object
  await db("plants").update(changes).where("id", id)
  return await db.first("*").from("plants").where("id", id)
}

async function removePlant(id) { // deletes plant object and returns deleted plant object. If no plant found with that ID, returns null.
  const deleted = await db.first("*").from("plants").where("id", id)
  if (deleted) {
      await db("plants").where("id", id).del()
      return deleted
  } else {
      return null
  }

}

module.exports = {
  add,
  find,
  findByFilter,
  updateUser,
  getUserPlants,
  addPlant,
  updatePlant,
  removePlant,
  getUsers
};
