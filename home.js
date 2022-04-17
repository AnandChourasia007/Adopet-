var express = require("express");
var router = express.Router();
////////////////
router.get('/search', async (req, res) => {
    var db = req.app.locals.db;
    var locationName = req.query.location;
    // const petsLocated = await db.collection('petsinfo').find({ $text: { $search: { location: locationName } } }).toArray(function (error, result) {
    const petsLocated = await db.collection('petsinfo').find({location : locationName}).toArray(function (error, result) {
        if(error)
        throw error;
        petsData = result; 
        res.render('home.hbs',{
            title:'Search',   
            pets: result,   
            style:'/home.css', 
            loggedin: req.session.loggedIn,
            user: req.session.username
        })  
    }); 
});
////////////////
router.get("/", async function (req, res) { 
    var db = req.app.locals.db;
    var petsData;
    var user = await db.collection('userInfo').findOne({ username: req.session.username });
    if (user) {
        // db.collection('petsinfo').find({ $and: [{ _id: { $nin: user.petAdded } }, { adopted: false }] }).toArray(function (error, result) {
        db.collection('petsinfo').find().toArray(function (error, result) {
            if (error) throw error
            petsData = result 
            res.render('home.hbs', {
                title: 'Home',   
                pets: result, 
                style: '/home.css', 
                loggedin: req.session.loggedIn,
                user: req.session.username
            })
        })
    } else {
        db.collection('petsinfo').find().toArray(function (error, result) {
            if (error) throw error
            petsData = result
            res.render('home.hbs', {
                title: 'Home',
                pets: result,
                style: '/home.css',
                loggedin: req.session.loggedIn,
                user: req.session.username
            });
        });
    }
})
module.exports = router;