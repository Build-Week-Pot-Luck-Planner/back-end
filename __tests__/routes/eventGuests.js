const supertest = require("supertest");
const server = require("../../server.js");
const db = require("../../data/db");

beforeEach(async () => {
	//run the seeds before each test
	//await db.seed.run();
});

let token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjA1ODEzNTY1LCJleHAiOjE2MDU4OTk5NjV9.oTOn6_k5dH7peDVupg--VWu3KrlacLaUGR2y5LmlmGo";


afterAll(async () => {
	//close the test runner db
	await db.destroy();
});

test("GET /", async () => {
	const res = await supertest(server).get("/api/");
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
	expect(res.body.message).toBe("we did it!");
});


test("EVENT GUESTS GET", async () => {
	const res = await supertest(server)
		.get("/api/potlucks/1/eventguests")
		.set("Authorization", token);
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
});
