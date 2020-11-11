var express = require('express');
var router = express.Router();
const {UserModel,GroupModel} = require('./../model/users')

/* GET users listing. */
router.get('/',(req, res, next)=>{
  UserModel.find({},{_id:0})
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
  console.log(phoneNo,name)
  let newUser = new UserModel(userDetails);
  newUser.save((err,result)=>{
    if(err){
      res.status(400).send("user with same phone number already exist");
    }
    else{
      console.log(result);
      res.send(result);
    }
  });
})

module.exports = router;
