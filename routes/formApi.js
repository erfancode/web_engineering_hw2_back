var express = require("express");
const fs = require('fs');
var router = express.Router();

var formsList;

fs.readFile('./form_list.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    formsList = JSON.parse(jsonString)
})

router.get("/", function(req, res, next) {
    var returnData = {"status" : "error", "description" : "" ,"data" : null};

    if(formsList != null){
        returnData.status = "success";
        returnData.description = "success";
        returnData.data = formsList;
    }

    res.json(returnData);
});

router.get("/:id", function(req, res, next) {
    
    var id = req.params.id;
    var found  = false;

    formsList.forEach(function(element){
        
        if(element.id == id){
            found = true;
        }
    });
    
    var returnData = {"status" : "error", "description" : "" ,"data" : null};

    if(!found){
        console.log("form with id " + id + " doesn't exist.");
        returnData.description = "form with id " + id + " doesn't exist";
        res.json(returnData);
        return;
    }
    
    fs.readFile('./form_' + id + '.json', 'utf8', (err, jsonString) => {
        if (err) {
            returnData.description = "file for form with id " + id + " doesn't exist";
            res.json(returnData);
            return;
        }
        returnData.status = "success";
        returnData.description = "success";
        returnData.data = JSON.parse(jsonString);
        res.json(returnData)
    })
});

module.exports = router