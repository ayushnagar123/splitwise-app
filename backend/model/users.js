const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const UsersSchema = new Schema({
  phoneNo:{type:String,unique:true},
  name:String
})

const GroupSchema = new Schema({
  list_of_people: [],
  title:String,
  expenses:[{
    list_of_people:[],
    expense_title:String,
    amount:Number,
    decription:String,
    payer:String
  }]
});

const ExpensesSchema = new Schema({
    list_of_people:[],
    expense_title:String,
    amount:Number,
    decription:String,
    payer:String
})

const UserModel = mongoose.model('users', UsersSchema);
const GroupModel = mongoose.model('groups', GroupSchema);
const ExpensesModel = mongoose.model('expenses', ExpensesSchema);

module.exports = {UserModel,GroupModel,ExpensesModel};