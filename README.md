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

Base url: https://bw-potluckplanner.herokuapp.com/  
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

Accepts:

    {
        username,
        password
    }


Returns:

    {
        token: jwtToken,
        message: "Welcome username"
    }

### **[POST] /api/auth/signup**
Signs up new user

Accepts: 

    {
        email,
        username,
        password,
        location (optional),
        pfp (optional)
    }

Returns:

    {
        token: jwtToken,
        message: "Your account was created"
    }

### **[GET] api/users?username=value (restricted)**
Gets array of users based on optional search query  

*not setting `?username=value` will return all users

Returns:

    {
        users: [
            {
                id: user's id,
                email: user's email,
                username: user's username,
                pfp: user's profile pic,
                location: user's location
            }...
        ]
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

### **[PUT] api/users/:userId (restricted)**
Updates info about a user

Accepts:

    {
        username (optional),
        email (optional),
        password (optional),
        location (optional),
        pfp (optional)
    }

Returns:

    {
        message: "Your account info was updated",
        user: {
            id
            username,
            email,
            password,
            location,
            pfp
        }
    }

### **[DELETE] /api/users/:userId (restricted)**
Deletes a users account

Returns:

    {
        message: "Your account was deleted,
        user: {
            id,
            username,
            email,
            password,
            location,
            pfp
        }
    }