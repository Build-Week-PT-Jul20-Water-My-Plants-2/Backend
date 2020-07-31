const db = require("../data/config");

async function add(data) {
  const [newUserId] = await db.insert(data, "id").into("users");
  const newUser = await db.first("*").from("users").where("id", newUserId);
  return newUser;
}

function findByFilter(filter) {
  return db("users").select("*").where("username", filter).first();
}

async function updateUser(changes, id) {
  // updates user and returns updated user object
  await db("users").update(changes).where("id", id);
  return await db
    .first("*")
    .from("users")
    .where("id", id)
    .select("id", "username", "phoneNumber");
}

function getUsers() {
  // returns list of users
  return db("users").select("id", "username", "phoneNumber");
}

function getUserById(id) {
  return db("users")
    .select("id", "username", "phoneNumber")
    .where({ id })
    .first();
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

module.exports = {
  add,
  findByFilter,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
};
