exports.seed = async function(knex) {
    // truncate
    await knex("plants").truncate()
    await knex("users").truncate()
};