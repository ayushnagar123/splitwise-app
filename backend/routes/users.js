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

router.get('/mygroups',(req,res)=>{
  
  console.log(req.query)
  let {phoneNo} = req.query;
  console.log(phoneNo)
  GroupModel.find(
    {list_of_people:{$in:[phoneNo]}}
  )
  .then(resp=>{
    console.log(resp)
    res.send(resp)
  })
  .catch(err=>{throw err;})
})

module.exports = router;
