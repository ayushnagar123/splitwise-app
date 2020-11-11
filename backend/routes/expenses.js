var express = require('express');
var router = express.Router();
const bson = require('bson');
const {UserModel,GroupModel,ExpensesModel} = require('../model/users')

router.get('/',(req,res)=>{
    res.send("expenses list")
})

router.patch('/:groupId',(req,res)=>{
    let groupId = req.params.groupId;
    let {expense_title,list_of_people,amount,description,payer} = req.body;
    let newExpense = new ExpensesModel({expense_title,list_of_people,amount,description,payer});
    GroupModel.updateOne(
      {_id:groupId},
      {
        $push:{
          expenses:newExpense
        }
      }
    )
    .then(resp=>{
      res.send(resp)
    })
    .catch(err=>{throw err;})
})


module.exports = router;