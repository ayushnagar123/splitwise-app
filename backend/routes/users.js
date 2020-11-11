var express = require('express');
var router = express.Router();
const {UserModel,GroupModel} = require('./../model/users')

/* GET users listing. */
router.get('/',(req, res, next)=>{
  GroupModel.find({},{_id:0,list_of_people:1,amount:1,expense_title:1})
    .then(resp=>{
      res.send(resp);
    })
    .catch(err=>{throw err})
});

router.get('/group',(req,res)=>{
  let {groupId} = req.body;
  GroupModel.find({_id:groupId})
    .then(resp=>{
      res.send(resp)
    })
    .catch(err=>{throw err;})
})

router.post('/expense',(req,res)=>{
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

router.post('/',(req,res)=>{
  // for creating a group
  let {phoneNo,name} = req.body;
  let userDetails = {
    phoneNo,
    name,
  } 
  let newUser = new UserModel(userDetails);
  newUser.save();
  res.send(newUser);
})

router.post('/group',(req,res)=>{
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
