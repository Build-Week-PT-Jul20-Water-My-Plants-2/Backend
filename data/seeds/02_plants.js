

exports.seed = async function(knex) {
    await knex("plants").insert([
      {nickname: "Rose", species: "Damask rose", h2oFrequency: "once a week", user_id: 1},
      {nickname: "Allium", species: "Allium hollandicum", h2oFrequency: "every day", user_id: 1},
      {nickname: "Orchid", species: "Phalaenopsis stuartiana", h2oFrequency: "once a week", user_id: 1},
      {nickname: "Poppies", species: "Papaveraceae", h2oFrequency: "twice a week", user_id: 2},
      {nickname: "Aster", species: "Asteraceae", h2oFrequency: "every day", user_id: 2},
      {nickname: "Lavender", species: "Lavandula", h2oFrequency: "once a week", user_id: 2},
      {nickname: "Calla lily", species: "Zantedeschia", h2oFrequency: "3 times a week", user_id: 3},
      {nickname: "Hyacinth", species: "Hyacinthus", h2oFrequency: "every day", user_id: 3},
      {nickname: "Camellia", species: "Camellia", h2oFrequency: "4 times a week", user_id: 3},
    ]);
};
