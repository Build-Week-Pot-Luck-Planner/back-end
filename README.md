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

### **[GET] /api/potlucks (required)**
Get's an array of all a users potlucks  
*users can only get their own potlucks from this endpoint

Returns: 

    [
        {
            id,
            organizerId,
            title,
            when,
            location
        }...
    ]


### **[POST] /api/potlucks (required)**
Create's a new potluck

Accepts:

    {
        title,
        when,
        location,
        items: [
            "itemName"
            ...
        ]
    }

Returns:

    {
        message: "Potluck created",
        potluck: {
            id,
            organizerId,
            title,
            when,
            location,
            items: [
                {
                    id,
                    name,
                    guestResponsible,
                    potluckId
                }...
            ]
        }
    }

### **[GET] /api/potlucks/:id (required)**
Returns info about a single potluck including food items and guests attending

Returns:

    {
        potluckId,
        title,
        when,
        location,
        organizerId,
        organizerUsername,
        organizerPfp,
        organizerLocation,
        items: [
            name,
            potluckId,
            guestUsername,
            guestId,
            guestPfp,
            guestLocation
        ],
        guests: [
            {
                id,
                username,
                pfp,
                location
            }
        ]
    }

### **[PUT] /api/potlucks/:id (required)**
Updates the potluck with new information

Accepts:

    {
        title,
        when,
        location,
        items: [
            "itemName",
            ...
        ]
    }

Returns:

    {
        potluckId,
        title,
        when,
        location, 
        organizerId,
        organizerUsername,
        organizerPfp,
        organizerLocation,
        items: [
            {
                name,
                potluckId,
                guestUsername,
                guestId,
                guestPfp,
                guestLocation
            }...
        ],
        guests: [
            {
                id,
                username,
                pfp,
                location
            }...
        ]
    }

### **[DELETE] /api/potlucks/:id (required)**
Deletes a potluck

Returns: 

    {
        message: "Your potluck was deleted",
        potluckToDelete: {
            id,
            organizerId,
            title,
            when,
            location
        }
    }

### **[GET] /api/potlucks/:id/items (required)**
Gets all items for a potluck

Returns:

    [
        {
            name,
            potluckId
        }
    ]

### **[GET] /api/users/:id/items (required)***
Gets all items a user plans to bring

Returns:
    [
        {
            id,
            name,
            guestResponsible,
            potluckId
        }
    ]

### **[POST] /api/potlucks/:id/items (required)**
Adds an item to a potluck

Accepts:

    {
        name,
    }

Returns: 

    "[item's name] added"

### **[PUT] /api/potlucks/:potluckId/items/:itemId (required)**
updates a specific potluck item

Accepts:

    {
        name,
    }

Returns: 

    {
        message: "Item updated"
    }

### **[DELETE] /api/potlucks/:potluckId/items/:itemId (required)**
Removes a specific item from a potluck

Returns:

    {
        message: "You have removed this item from the potluck"
    }

### **[GET] /api/potlucks/:id/invitations (required)**
Gets an array of invitations for a potluck

Returns:
    
    [
        {
            title,
            username,
            id
        }...
    ]

### **[GET] /api/users/:id/invitations (required)**
Gets all invitations for a user

Returns:

    [
        {
            title,
            username,
            id
        }...
    ]

### **[POST] /api/potlucks/:id/invitations (required)**
Invites a user to a potluck

Accepts:

    {
        id (the guest's id),
        username
    }

Returns:

    "[guests username] successfully invited"

### **[PUT] /api/potlucks/:potluckId/invitations/:inviteId (required)**
Route for user to accept or decline an invite

Accepts:

    {
        status: (-1 for decline, 1 for accept)
    }

Returns:

    when accepted
    {
        message: "Congrats - you are on the guestlist"
    }

    when declined
    {
        message: "Hope to see you at the next one!"
    }

### **[DELETE] /api/potlucks/:id/invitations/:inviteId (required)**

Returns:

    {
        message: "You have been removed from the guestlist of this potluck"
    }

### **[GET] /api/potlucks/:id/:id/eventGuests (required)**
Gets all guests attending a potluck

Returns:

    {
        title,
        username,
        potluckId
    }

### **[DELETE] /eventGuests/:guestId (required)**
Removes a user from the guest list

Returns:

    {
            message: "Guest successfully removed from guestlist"
    }