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

describe("GET /api/potlucks tests", ()=>{
    it("Should return a list of all a user's potlucks", async()=>{
        const res = await supertest(server).get("/api/potlucks").set({"Authorization": token});
        const potlucks = res.body;
        expect(res.status).toBe(200);
        expect(Array.isArray(potlucks)).toBe(true);
        expect(potlucks).toHaveLength(2)
        expect(potlucks[0].id).toBe(1);
        expect(potlucks[0].organizerId).toBe(1);
    });
});

describe("POST /api/potlucks/ tests", ()=>{
    afterAll(async()=>{
        await db.seed.run();
    });

    it("Should create a new potluck", async()=>{
        const res = await supertest(server).post("/api/potlucks/").set({"Authorization": token}).send({
            title: "New Potluck",
            when: Date.now(),
            location: "123 Here",
            items: ["Potato Salad", "Turkey", "Mac and Cheese"]
        });
        const potluck = res.body.potluck;
        
        expect(potluck).toBeDefined();
        expect(potluck.organizerId).toBe(1);
        expect(potluck.title).toBe("New Potluck");
        expect(potluck.location).toBe("123 Here");
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(potluck.items).toHaveLength(3);
        expect(potluck.items[0].name).toBe("Potato Salad");
    });
})

describe("GET /api/potlucks/:potluckId tests", ()=>{
    it("Should return info about a specific potluck", async()=>{
        const res = await supertest(server).get("/api/potlucks/1").set({"Authorization": token});
        const potluck = res.body;
        expect(potluck.potluckId).toBe(1);
        expect(potluck.title).toBe("Potluck 1");
        expect(potluck.organizerUsername).toBeDefined();
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(Array.isArray(potluck.guests)).toBe(true);
    });

    it("Should allow users to get info potlucks they don't own", async()=>{
        const res = await supertest(server).get("/api/potlucks/2").set({"Authorization": token});
        const potluck = res.body;
        expect(res.status).toBe(200);
        expect(potluck.potluckId).toBe(2);
        expect(potluck.organizerId).toBe(2)
        expect(potluck.organizerUsername).toBeDefined();
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(Array.isArray(potluck.guests)).toBe(true);
    });
});

describe("PUT /api/potlucks/:potluckId tests", ()=>{
    it("Should update a potluck with optional fields", async()=>{
        const res = await supertest(server).put("/api/potlucks/1").set({"Authorization": token}).send({
            title: "New Updates",
        });
        const potluck = res.body;
        expect(potluck.title).toBe("New Updates");
        expect(potluck.potluckId).toBe(1);
        expect(potluck.organizerId).toBe(1);
        expect(potluck.location).toBe("123 Place St, New York NY");
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(potluck.items[0]).not.toBeDefined();
    });

    it("Should create new items given an items field", async()=>{
        const res = await supertest(server).put("/api/potlucks/1").set({"Authorization": token}).send({
           items: ["item1", "item2"]
        });
        const potluck = res.body;
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(potluck.items).toHaveLength(2);
        expect(potluck.items[0].name).toBe("item1");
        expect(potluck.items[1].name).toBe("item2");
    });
});