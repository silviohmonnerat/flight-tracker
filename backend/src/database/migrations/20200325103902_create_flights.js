exports.up = function(knex) {
  return knex.schema.createTable("flights", table => {
    table.increments();
    table.string("flight_date").notNullable();
    table.string("flight_status").notNullable();
    table.string("departure").notNullable();
    table.string("arrival").notNullable();
    table.string("airline").notNullable();
    table.string("flight").notNullable();
    table.string("aircraft").notNullable();
    table.string("live").notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("flights");
};
