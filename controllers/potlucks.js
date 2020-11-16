const potlucksModel = require("../models/potlucks");

async function getUsersPotlucks(req, res){
    try {
        const potlucks = await potlucksModel.getUsersPotlucks(req.user.id);
        res.status(200).json(potlucks);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function createPotluck(req, res){
    const {title, when, location, items} = req.body;
    if(!title || !when, !location) return res.status(400).json({message: "Title, date, and location are required"});
    
    try {
        const newPotluck = await potlucksModel.createPotluck(req.user.id, title, when, location, items);
        res.status(201).json({message: "Potluck created", potluck: newPotluck});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function getPotluck(req, res){
    const {potluckId} = req.params;
    try {
        const potluck = await potlucksModel.getPotluck(potluckId);
        res.status(200).json(potluck);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function updatePotluck(req, res){
    const {potluckId} = req.params;
    const changes = req.body;
    try {
        const potluck = await potlucksModel.updatePotluck(potluckId, changes);
        res.status(200).json(potluck);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function deletePotluck(req, res){
    const {potluckId} = req.params;
    try {
        const potluckToDelete = await potlucksModel.deletePotluck(potluckId, req.user.id);
        if(!potluckToDelete) return res.status(404).json({message: "Potluck does not exist"});
        res.status(200).json({message: "Your potluck was deleted", potluckToDelete});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred"});
    }
}

module.exports = {
    getUsersPotlucks,
    createPotluck,
    getPotluck,
    updatePotluck,
    deletePotluck
}