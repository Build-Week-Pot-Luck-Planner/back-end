const supertest = require("supertest");
const server = require("../../server.js");
const db = require("../../data/db");

beforeEach(async () => {
	//run the seeds before each test
	//await db.seed.run();
});

let token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA1NTY4NTUxLCJleHAiOjE2MDU2NTQ5NTF9.7ZRa5y_oJvq1OtuTLzqEFSys8nYKo6C0sel3eRSlaBQ";

afterAll(async () => {
	//close the test runner db
	await db.destroy();
});

//GET
test("EVENT INVITATIONS GET", async () => {
	const res = await supertest(server)
		.get("/api/potlucks/1/invitations")
		.set("Authorization", token);
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
});

test("USER INVITATIONS GET", async () => {
	const res = await supertest(server)
		.get("/api/users/1/invitations")
		.set("Authorization", token);
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
});

//POST
test("EVENT INVITATIONS POST", async () => {
	const res = await supertest(server)
		.post("/api/potlucks/1/invitations")
		.set("Authorization", token)
		.send({ username: "testingRob", id: 4, status: 0 });
	expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toBe("testingRob successfully invited");
});


//PUT
test("EVENT INVITATIONS PUT", async () => {
	const res = await supertest(server)
		.put("/api/potlucks/1/invitations/1")
		.set("Authorization", token)
		.send({ username: "testingRob", guestId: 4, potluckId: 1, status: 1 });
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
	expect(res.body.message).toBe("Congrats - you are on the guestlist");
});

//DElETE

