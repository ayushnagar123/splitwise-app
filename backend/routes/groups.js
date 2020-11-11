var express = require('express');
var router = express.Router();
const {GroupModel} = require('./../model/users')

router.get('/',(req, res, next)=>{
    GroupModel.find({},{_id:0,list_of_people:1,amount:1,expense_title:1})
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

module.exports = router;