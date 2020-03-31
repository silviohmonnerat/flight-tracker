exports.up = function(knex) {
  return knex.schema.createTable("airports", table => {
    table.increments();
    table.string("airport_name").notNullable();
    table.string("iata_code").notNullable();
    table.string("icao_code").notNullable();
    table.string("latitude").notNullable();
    table.string("longitude").notNullable();
    table.string("timezone").notNullable();
    table.string("gmt").notNullable();
    table.string("phone_number").notNullable();
    table.string("country_name").notNullable();
    table.string("country_iso2").notNullable();
    table.string("city_iata_code").notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("airports");
};
