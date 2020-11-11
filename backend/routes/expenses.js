var express = require('express');
const { route } = require('.');
var router = express.Router();
const {UserModel,GroupModel} = require('../model/users')

router.get('/',(req,res)=>{
    res.send("expenses list")
})

router.post('/',(req,res)=>{
    let {groupId,expense_title,list_of_people,amount,description,payer} = req.body;
    GroupModel.aggregate([
      {$match:{"_id":groupId}},
      {$group:{
        $push:{
          expenses:{
            expense_title,list_of_people,payer,amount,description
          }
        }
      }}
    ])
    .then(resp=>{
      res.send(resp)
    })
    .catch(err=>{throw err;})
})

module.exports = router;