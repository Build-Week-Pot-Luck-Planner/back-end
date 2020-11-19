const supertest = require("supertest");
const server = require("../../server.js");
const db = require("../../data/db");

afterAll(async()=>{
    await db.destroy();
});

let token;

beforeAll(async()=>{
    const res = await supertest(server).post("/api/auth/login").send({username: "Test", password: "password"});
    token = res.body.token;
});

describe("GET /api/users tests", ()=>{
    it("Should return a list of users based on query string", async()=>{
        const res = await supertest(server).get("/api/users?username=b").set({"Authorization": token});
        expect(res.body.users).toBeDefined();
        expect(Array.isArray(res.body.users)).toBe(true);
        expect(res.body.users).toHaveLength(1);
    });

    it("Should return all users in db if given no query", async()=>{
        const res = await supertest(server).get("/api/users").set({"Authorization": token});
        expect(res.body.users).toBeDefined();
        expect(Array.isArray(res.body.users)).toBe(true);
        expect(res.body.users).toHaveLength(3);
    });

    it("Should return 401 if token not provided", async()=>{
        const res = await supertest(server).get("/api/users");
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Token not provided");
    });

    it("Should return 401 if invalid token provided", async()=>{
        const res = await supertest(server).get("/api/users").set({"Authorization": "something"});
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid token");
    });
});

describe("GET /api/users/:userId tests", ()=>{
    it("Should get a users information", async()=>{
        const res = await supertest(server).get("/api/users/1/").set({"Authorization": token});
        const user = res.body.user
        expect(res.status).toBe(200);
        expect(user).toBeDefined();
        expect(user.username).toBe("Test");
        expect(user.id).toBe(1);
        expect(Array.isArray(user.potlucks)).toBe(true);
        expect(user.potlucks).toHaveLength(2)
    });

    it("Should return 403 if user tries to get another user's info", async()=>{
        const res = await supertest(server).get("/api/users/2").set({"Authorization": token});
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Unauthorized");
    })
});

describe("PUT /api/users/:userId endpoint", ()=>{
    afterAll(async()=>{
        await db.seed.run();
    });

    it("Should return the users updated information", async()=>{
        const res = await supertest(server).put("/api/users/1").set({"Authorization": token}).send({
            email: "newEmail@yahoo.com",
        });
        const user = res.body.user;

        expect(res.status).toBe(200);
        expect(user.id).toBe(1);
        expect(user.username).toBe("Test");
        expect(user.email).toBe("newEmail@yahoo.com");
    });

    it("Should return 403 if user attempts to edit another users info", async()=>{
        const res = await supertest(server).put("/api/users/2").set({"Authorization": token}).send({
            username: "something else"
        });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Unauthorized");
    });
});

describe("DELETE /api/users/:userId endpoint", ()=>{
    afterAll(async()=>{
        await db.seed.run();
    });

    it("Should delete the users account", async()=>{
        const res = await supertest(server).delete("/api/users/1").set({"Authorization": token});
        const user = res.body.user;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("You account was deleted");
        expect(user.id).toBe(1);
        expect(user.username).toBe("Test");
        expect(user.email).toBe("test@gmail.com");
    });

    it("Should return 403 if user attempts to delete another users account", async()=>{
        const res = await supertest(server).delete("/api/users/2").set({"Authorization": token});
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Unauthorized");
    });
});