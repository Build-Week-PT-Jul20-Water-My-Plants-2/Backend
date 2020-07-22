const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {

  const hashedPass = await bcrypt.hash("123", 10)

  await knex("users").insert([
    {username: "Jane", password: hashedPass},
    {username: "James", password: hashedPass},
    {username: "Dan", password: hashedPass},
  ]);
};
