module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./data/dev.sqlite3",
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},

	testing: {
		client: "sqlite3",
		connection: {
			filename: "./data/testing.sqlite3",
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
	production: {
		client: "pg",
		connection: {
			host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: process.env.PG_PORT
		},
	},
};
