const express = require('express');
const route = express.Router();
const axios = require('axios');


route.get('/', async (req, res) => {

    try {
        const response = await axios.get('http://localhost:3000/rectangles/api/rects');
        res.render('index', {rects: response.data});
    } catch (err) {
        res.send(err);
    };
});

route.get('/add-rect', (req, res) => {
    res.render('add_rect');
});

route.get('/update-rect', (req, res) => {
    axios.get('http://localhost:3000/rectangles/' + req.query.id)
    .then(function(rectdata){
        res.render("update_rect", { rect : rectdata.data});
    })
    .catch(err =>{
        res.send(err);
    })
});

route.get('/more-rect', (req, res) => {
    axios.get('http://localhost:3000/rectangles/' + req.query.id)
    .then(function(rectdata){
        res.render("more_rect", { rect : rectdata.data});
    })
    .catch(err =>{
        res.send(err);
    })

})



module.exports = route