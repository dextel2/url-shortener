const express = require('express');
const bodyParser = require('body-parser');
//mini app for different routes, better for modularity
const router = express.Router();
const mongoose = require('mongoose');

let db = require('../models/db');
let URL = require('mongoose').model('URL');
mongoose.Promise = global.Promise;


//route for redirecting to another url
router.get('/*?', (req, res) => {


  //grab input
    let id = req.params[0];
    //if input is not a number, return an error
    if (checkInput(id) === false) {
      res.send("Please enter in a number as part of the URL, no letters");

    } else {
    //get link, then redirect
    db.getLinkById(id)
    .then((urlObj) => {
      return getShortObj(urlObj);
    })
    .then((result) => {
      return redirect(result);
    });

    }

    function getShortObj(urlObj) {

      return urlObj;
    };

    function redirect(shortObj){

    let url = shortObj[0].original_url;

      if (url.includes("http") || url.includes("https")) {
        res.redirect(url);

      } else {
        let httpUrl = "http://" + url;
        res.redirect(httpUrl);

      }

    };


    function checkInput(input){

      let check = Number(input);

      if (isNaN(check)) {

        return false;
      }

      return true;
    }



});



module.exports = router;
