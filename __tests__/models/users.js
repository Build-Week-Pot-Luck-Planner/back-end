// const db = require("../../data/db");
// const usersModel = require("../../models/users");

// describe("getUsers Tests", ()=>{
//     it("Should return an array of all users", async()=>{
//         const users = await usersModel.getUsers();

//         expect(Array.isArray(users)).toBe(true);
//         expect(users).toHaveLength(3);
//         expect(users[0].username).toBe("Test");
//     });

//     it("Should return an array of all users matching a query", async()=>{
//         let users = await usersModel.getUsers("T");
        
//         expect(users).toHaveLength(1);
//         expect(users[0].username).toBe("Test");

//         users = await usersModel.getUsers("Bo");

//         expect(users).toHaveLength(1);
//         expect(users[0].username).toBe("Bob");
//     });
// });

// describe("findByUsername Tests", ()=>{
//     it("Should return a single user object", async()=>{
//         const user = await usersModel.getByUsername("Test");

//         expect(Array.isArray(user)).toBe(false);
//         expect(typeof user).toBe("object");

//         expect(user.id).toBe(1);
//         expect(user.username).toBe("Test");
//         expect(user.email).toBe("test@gmail.com")
//     });

//     it("Should return undefined for nonexistent user", async()=>{
//         let user = await usersModel.getByUsername("thisuserdoesnotexist");
//         expect(user).toBe(undefined);
//     });

//     it("Should throw an error if username parameter not given", ()=>{
//         return expect(()=> usersModel.getByUsername()).rejects.toThrow();
//     });
// });

// describe("createUser tests", ()=>{
//     afterEach(async ()=>{
//         await db.seed.run();
//     });

//     it("Should return a newly created user with required fields", async()=>{
//         const newUser = await usersModel.createUser("person@gmail.com", "person", "password");
        
//         expect(newUser.id).toBe(4);
//         expect(newUser.email).toBe("person@gmail.com");
//         expect(newUser.username).toBe("person");
//         expect(newUser.password).not.toBeDefined();
//         expect(newUser.location).toBe(null);
//         expect(newUser.pfp).toBe("https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg");
//     });

//     it("Should return a newly created user with all fields", async()=>{
//         const newUser = await usersModel.createUser("person@gmail.com", "person",
//         "password", "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//         "456 Park Ave, St Louis MS")

//         expect(newUser.id).toBe(4);
//         expect(newUser.email).toBe("person@gmail.com");
//         expect(newUser.username).toBe("person");
//         expect(newUser.password).not.toBeDefined();
//         expect(newUser.location).toBe("456 Park Ave, St Louis MS");
//         expect(newUser.pfp).toBe("https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
//     });

//     it("Should throw errors if required fields not given", async()=>{
//         expect(()=> usersModel.createUser(null, "person", "password")).rejects.toThrow();
//         expect(()=> usersModel.createUser("person@gmail.com", null, "password")).rejects.toThrow();
//         expect(()=> usersModel.createUser("person@gmail.com", "person", null)).rejects.toThrow();
//     });
// });

// describe("updateUser Tests", ()=>{
//     afterEach(async()=>{
//         await db.seed.run();
//     });

//     it("Should update only the specified fields", async ()=>{
//         let updatedUser = await usersModel.updateUser(1, {username: "newUsername"});
        
//         expect(updatedUser.email).toBe("test@gmail.com");
//         expect(updatedUser.username).toBe("newUsername");
//         expect(updatedUser.location).toBe(null);
//         expect(updatedUser.pfp).toBe('https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg');
        
//         updatedUser = await usersModel.updateUser(1, {email: "newemail@gmail.com", pfp: "www.none.com/none.jpg"});
//         expect(updatedUser.email).toBe("newemail@gmail.com");
//         expect(updatedUser.username).toBe("newUsername");
//         expect(updatedUser.location).toBe(null);
//         expect(updatedUser.pfp).toBe("www.none.com/none.jpg");
//     });

//     it("Should ignore columns that don't exist", async()=>{
//         let updatedUser = await usersModel.updateUser(1, {username: "Ant", someField: "shouldn't be here"});

//         expect(updatedUser.someField).not.toBeDefined();
//         expect(updatedUser.email).toBe("test@gmail.com");
//         expect(updatedUser.username).toBe("Ant");
//         expect(updatedUser.location).toBe(null);
//         expect(updatedUser.pfp).toBe('https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg');
//     });

//     it("Should return unchanged user object if changes object is empty", async()=>{
//         let updatedUser = await usersModel.updateUser(1, {});

//         expect(updatedUser.someField).not.toBeDefined();
//         expect(updatedUser.email).toBe("test@gmail.com");
//         expect(updatedUser.username).toBe("Test");
//         expect(updatedUser.location).toBe(null);
//         expect(updatedUser.pfp).toBe('https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg');
//     });

//     it("Should throw an error if user id or changes parameters not provided", async()=>{
//         expect(()=> usersModel.updateUser(1)).rejects.toThrow();
//         expect(()=> usersModel.updateUser(undefined, {})).rejects.toThrow();
//         expect(()=> usersModel.updateUser(null, {})).rejects.toThrow();
//     })
// });

// describe("deleteUser Test", ()=>{
//     afterEach(async()=>{
//         await db.seed.run();
//     });

//     it("Should remove user from the database", async ()=>{
//         let users = await db("users");
//         expect(users).toHaveLength(3);

//         const deletedUser = await usersModel.deleteUser(1);        
//         expect(deletedUser.username).toBe("Test");

//         users = await db("users");
//         expect(users).toHaveLength(2);
//     });

//     it("Should return undefined if user not found", async()=>{
//         let users = await db("users");
//         expect(users).toHaveLength(3);

//         const deletedUser = await usersModel.deleteUser(3423432);
//         expect(deletedUser).toBe(undefined);

//         users = await db("users");
//         expect(users).toHaveLength(3);
//     });

//     it("Should throw an error if user id not given", async()=>{
//         expect(()=> usersModel.deleteUser()).rejects.toThrow();
//     });
// })