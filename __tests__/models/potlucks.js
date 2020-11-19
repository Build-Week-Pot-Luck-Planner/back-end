const db = require("../../data/db");
const potlucksModel = require("../../models/potlucks");


afterAll(async()=>{
    await db.destroy();
});

describe("getUsersPotlucks tests", ()=>{
    it("Should get a list of all the users potlucks", async()=>{
        const potlucks = await potlucksModel.getUsersPotlucks(1);
        expect(potlucks).toHaveLength(2);
        potlucks.forEach(potluck=>{
            expect(potluck.organizerId).toBe(1);
        });
    });

    it("Should throw and error if user id not given", async()=>{
        expect(()=> potlucksModel.getUsersPotlucks()).rejects.toThrow();
    });
});

describe("createPotluck tests", ()=>{
    afterEach(async()=>{
        await db.seed.run();
    });

    it("Should return a newly created potluck", async()=>{
        const before = await potlucksModel.getUsersPotlucks(1);
        
        const newPotluck = await potlucksModel.createPotluck(1, "NewPotluck", Date.now().toLocaleString(), "123 Somewhere", ["eggs", "bacon"]);
        expect(newPotluck.organizerId).toBe(1);
        expect(newPotluck.title).toBe("NewPotluck");
        expect(newPotluck.location).toBe("123 Somewhere");
        expect(newPotluck.items).toHaveLength(2);

        const after = await potlucksModel.getUsersPotlucks(1);
        expect(after.length === before.length + 1);
    });

    it("Should throw an error if any field is missing", async()=>{
        expect(
            ()=>potlucksModel.createPotluck(null, "NewPotluck", Date.now().toLocaleString(), "123 Somewhere", ["eggs", "bacon"])
        ).rejects.toThrow();
        expect(
            ()=>potlucksModel.createPotluck(1, null, Date.now().toLocaleString(), "123 Somewhere", ["eggs", "bacon"])
        ).rejects.toThrow();
        expect(
            ()=>potlucksModel.createPotluck(1, "NewPotluck", null, "123 Somewhere", ["eggs", "bacon"])
        ).rejects.toThrow();
        expect(
            ()=>potlucksModel.createPotluck(1, "NewPotluck", Date.now().toLocaleString(), null, ["eggs", "bacon"])
        ).rejects.toThrow();
        expect(
            ()=>potlucksModel.createPotluck(1, "NewPotluck", Date.now().toLocaleString(), "123 Somewhere", null)
        ).rejects.toThrow();
    })
});

describe("getPotluck tests", ()=>{
    it("Should return a potluck with info about items and guests", async()=>{
        const potluck = await potlucksModel.getPotluck(1);
        expect(potluck.potluckId).toBe(1);
        expect(potluck.title).toBe("Potluck 1");
        expect(Array.isArray(potluck.items)).toBe(true);
        expect(potluck.items).toHaveLength(3);
        expect(Array.isArray(potluck.guests)).toBe(true);
        expect(potluck.guests).toHaveLength(1);
    });

    it("Should throw an error if id not given", async()=>{
        expect(()=> potlucksModel.getPotluck()).rejects.toThrow();    
    })
});

describe("deletePotluck tests", ()=>{
    afterEach(async()=>{
        await db.seed.run();
    });
    it("Should remove a potluck from the database", async()=>{
        const before = await db("potlucks");

        const deletedPotluck = await potlucksModel.deletePotluck(1, 1);
        expect(deletedPotluck.id).toBe(1);
        expect(deletedPotluck.title).toBe("Potluck 1");
        expect(deletedPotluck.organizerId).toBe(1);  

        const after = await db("potlucks");
        expect(after.length + 1 == before.length).toBe(true);
    });

    it("Should throw an error if user id not given", async()=>{
        expect(()=> potlucksModel.deletePotluck(1)).rejects.toThrow();
    });

    it("Should throw an error if potluck id not given", async()=>{
        expect(()=> potlucksModel.deletePotluck(null, 1)).rejects.toThrow();
    })
});
