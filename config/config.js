require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_TEST,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
