const express = require('express');
var router = express.Router();
const Rectangle = require('../db/models/Rectangle')

//List all Rects
router.get('/api/rects', async (req, res) => {
    try {
        const rects = await Rectangle.find();
        res.json(rects);

    } catch (err) {
        res.json({message:err});
    }
});

//Add Rect
router.post('/api/rects', async (req, res) => {
    // console.log(req.body);
    if(!req.body) {
        res.status(400).send({message: "Cannot be empty"});
        return;
    }
    //create a new rectangle 
    const rect = new Rectangle({
        email: req.body.email,
        width: req.body.width,
        height: req.body.height,
        title: req.body.title,
        color: req.body.color,
        description: req.body.description,
        city: req.body.city
    });

    try {
        //save rectangle
        const savedRect = await rect.save();
        // res.json(savedRect);
        res.redirect('/add-rect');
    } catch(err) {
        res.status(500).send({message:err.message || "Some error has occured while creating a new rectangle."});
    }
});

//Find Specific Rect
router.get('/:id', async (req, res) =>{
    try {
        const rect = await Rectangle.findById(req.params.id);
        res.send(rect);
        // res.json(rect);
    } catch (err) {
        res.json({message: err });
    }
});


//Update Rect
router.patch('/:id', async (req, res) => {

    if(!req.body) {
        res.status(400).send({message: "Cannot be empty"});
        return;
    }

    const id = req.params.id;

    try {
        const updates = {}
        if(req.body.email) {
            updates.email = req.body.email;
        }
        if(req.body.width) {
            updates.width = req.body.width;
        }
        if(req.body.height) {
            updates.height = req.body.height;
        }
        if(req.body.title) {
            updates.title = req.body.title;
        }
        if(req.body.color) {
            updates.color = req.body.color;
        }
        if(req.body.description) {
            updates.description = req.body.description;
        }
        if(req.body.city) {
            updates.city = req.body.city;
        }

        const updatedRect = await Rectangle.updateOne(
            { _id: id}, 
            { $set: updates }, 
            { new: true }
            );

           
        // res.send(rect);
        res.json(updatedRect);
    } catch(err) {
        res.status(500).send({message: "Error updating rectangle info"});
   }
});

//Delete Rect
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const removedRect = await Rectangle.deleteOne({_id: id});
        
        res.send({ message : "Rectangle was deleted successfully!"});
        
    } catch(err) {
        res.status(404).send({ message: "Cannot Delete with id " + id});
    }
});

module.exports = router;