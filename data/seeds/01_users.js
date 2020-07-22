const bcrypt = require("bcryptjs");

const hashedPass = await bcrypt.hash("123", 10)

exports.seed = async function(knex) {
  await knex("users").insert([
    {username: "Jane", password: hashedPass},
    {username: "James", password: hashedPass},
    {username: "Dan", password: hashedPass},
  ]);
};
