const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {

  const hashedPass = await bcrypt.hash("123", 10)

  await knex("users").insert([
    {username: "Jane", password: hashedPass, phoneNumber: "111-111-111"},
    {username: "James", password: hashedPass, phoneNumber: "222-222-222"},
    {username: "Dan", password: hashedPass, phoneNumber: "333-333-333"},
  ]);
};
