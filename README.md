# Potluck Planner Backend API

## File and Variable Naming Conventions
use camelCase for vars and files

## Dependencies
express, knex, sqlite3, pg, nodemon, dotenv cross-env, cors
bcryptjs, jsonwebtoken, jest, supertest

## File Structure
```
node_modules/
data/
    --- migrations/
        --- createUsersTable.js
        --- createPotlucksTable.js...
    --- seeds/
        --- 01Users.js
        --- 02Potlucks.js...
    --- dev.sqlite3
    --- testing.sqlite3
    --- db.js
models/
    --- users.js
    --- potlucks.js...
routes/
    --- index.js
    --- users.js
    --- potlucks.js...
controllers/
    --- users.js
    --- potlucks.js...
middleware/
    --- auth.js
server.js
index.js
knexfile.js
.env
```