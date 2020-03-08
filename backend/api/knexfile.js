module.exports = {
  client: "mysql",
  connection: {
    // host: 'mysql',
    host: "localhost",
    user: "root",
    password: "asdf",
    database: "bazaar"
  },
  pool: {
    min: 1,
    max: 1
  },
  migrations: {
    directory: __dirname + "/migrations"
  }
};
