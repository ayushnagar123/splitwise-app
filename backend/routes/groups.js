var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const {GroupModel} = require('./../model/users')

router.get('/',(req, res, next)=>{
    GroupModel.find({},{_id:0,list_of_people:1,title:1,expenses:1})
      .then(resp=>{
        res.send(resp);
      })
      .catch(err=>{throw err})
});

router.get('/:groupId',(req,res)=>{
    let {groupId} = req.params;
    GroupModel.find({_id:groupId})
      .then(resp=>{
        res.send(resp)
      })
      .catch(err=>{throw err;})
})  

router.post('/',(req,res)=>{
    // for creating a group
    let {list_of_people,title} = req.body;
    let groupDetails = {
      list_of_people,
      title,
      expenses:[]
    } 
    let newGroup = new GroupModel(groupDetails);
    newGroup.save();
    res.send(newGroup);
})

router.patch('/addpeople/:groupId',(req,res)=>{
    var {new_people} = req.body;
    console.log(req.params.groupId,new_people)
    GroupModel.updateOne(
        {
            _id: req.params.groupId
        },
        {
            $push:{
                list_of_people:{$each:new_people}
            }
        }
    ,(err,result)=>{
        if(err){throw err;}
        res.send(result)
    })
})

module.exports = router;