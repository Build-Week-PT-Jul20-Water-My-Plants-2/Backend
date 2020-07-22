const db = require("../data/config");

function add(data) {
  return db("users").insert(data);
}

function find() {
  return db("users").select("username");
}

function findByFilter(filter) {
  return db("users")
    .select("id", "username", "password")
    .where("username", filter)
    .first();
}

module.exports = {
  add,
  find,
  findByFilter,
};
