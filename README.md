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

# API Documentation

Base Url: https://bw-potluckplanner.herokuapp.com/  
Routes marked with *(required)* require Authorizaton header set with JWT

## Endpoints

### **[GET] /api**
Base endpoint; can use to check if its up and running

Returns: 
``` 
"Welcome to the API"
```

### **[POST] /api/auth/login**
Logs in user

Returns:

    {
        token: jwtToken,
        message: "Welcome username"
    }

### **[POST] /api/auth/signup**
Signs up new user

Returns:

    {
        token: jwtToken,
        message: "Your account was created"
    }

### **[GET] api/users/:userId (restricted)**
Gets user info with list of potlucks they've created

Returns:

    {
        user: {
            id: user's id,
            username: user's username,
            email: user's email,
            pfp: user's profile pic,
            location: user's location,
            potlucks: [
                {
                    potluckId: potluck's id,
                    title: potluck's title,
                    organizerId: organizer's id,
                    when: datetime of when potluck will take place
                    location: potluck's location
                }...
            ]
        }
    }
    