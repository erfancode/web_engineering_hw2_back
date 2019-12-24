var express = require("express");
const fs = require('fs');
var router = express.Router();

var submittedList;

fs.readFile('./submitted.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    submittedList = JSON.parse(jsonString)
})

router.post("", function(req, res) {
    const data = req.body;

    submittedList.push(data)
    fs.writeFile('./submitted.json', JSON.stringify(submittedList), function (err) {
        if (err) throw err;
      }); 

    res.json({message : "success"});
});

module.exports = router