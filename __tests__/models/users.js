const db = require("../../data/db");
const usersModel = require("../../models/users");

describe("findByUsername Tests", ()=>{
    it("Should return a single user object", async()=>{
        const user = await usersModel.getByUsername("Test");

        expect(Array.isArray(user)).toBe(false);
        expect(typeof user).toBe("object");

        expect(user.id).toBe(1);
        expect(user.username).toBe("Test");
        expect(user.email).toBe("test@gmail.com")
    });

    it("Should return undefined for nonexistent user", async()=>{
        let user = await usersModel.getByUsername("thisuserdoesnotexist");
        expect(user).toBe(undefined);
    });

    it("Should throw an error if username parameter not given", ()=>{
        return expect(()=> usersModel.getByUsername()).rejects.toThrow();
    });
});

describe("createUser tests", ()=>{
    afterEach(async ()=>{
        await db.seed.run();
    });

    it("Should return a newly created user with required fields", async()=>{
        const newUser = await usersModel.createUser("person@gmail.com", "person", "password");
        
        expect(newUser.id).toBe(4);
        expect(newUser.email).toBe("person@gmail.com");
        expect(newUser.username).toBe("person");
        expect(newUser.password).not.toBeDefined();
        expect(newUser.location).toBe(null);
        expect(newUser.pfp).toBe("https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg");
    });

    it("Should return a newly created user with all fields", async()=>{
        const newUser = await usersModel.createUser("person@gmail.com", "person",
        "password", "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        "456 Park Ave, St Louis MS")

        expect(newUser.id).toBe(4);
        expect(newUser.email).toBe("person@gmail.com");
        expect(newUser.username).toBe("person");
        expect(newUser.password).not.toBeDefined();
        expect(newUser.location).toBe("456 Park Ave, St Louis MS");
        expect(newUser.pfp).toBe("https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
    });

    it("Should throw errors if required fields not given", async()=>{
        expect(()=> usersModel.createUser(null, "person", "password")).rejects.toThrow();
        expect(()=> usersModel.createUser("person@gmail.com", null, "password")).rejects.toThrow();
        expect(()=> usersModel.createUser("person@gmail.com", "person", null)).rejects.toThrow();
    });
});