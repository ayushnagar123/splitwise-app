import React, { Component } from 'react';
import axios from 'axios';
export default class CreateExpense extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : props.id,
            expense_title:"",
            list_of_people:[],
            new_people:"",
            amount:"",
            description:"",
            payer:""
        }
        this.onAddingPeople = this.onAddingPeople.bind(this);
        this.toAddPeople = this.toAddPeople.bind(this);
        this.onChangePayer = this.onChangePayer.bind(this);   
        this.onChangeExpenseTitle = this.onChangeExpenseTitle.bind(this); 
        this.onChangeAmount = this.onChangeAmount.bind(this); 
        this.onChangeDescription = this.onChangeDescription.bind(this); 
        this.addExpense = this.addExpense.bind(this); 
    }

    toAddPeople(e){
        this.state.list_of_people.push(this.state.new_people);
        console.log(this.state)
    }
    onAddingPeople(e){
        this.setState({new_people:e.target.value});
    }
    onChangeAmount(e){
        this.setState({amount:e.target.value});
    }
    onChangePayer(e){
        this.setState({payer:e.target.value});
    }
    onChangeExpenseTitle(e){
        this.setState({expense_title:e.target.value});
    }
    onChangeDescription(e){
        this.setState({description:e.target.value});
    }
    addExpense(e){
        // console.log(this.props)
        axios.patch(`http://localhost:5000/expenses/${this.state.id}`,{
            list_of_people:this.state.list_of_people,
            expense_title:this.state.expense_title,
            amount:this.state.amount,
            payer:this.state.payer
        })
        .then(resp=>{console.log(resp)})
        .catch(err=>{console.log(err)})
    }
    render() {
        return (
            <div>
              <h1>Add Expence</h1>
              <label>New Person:</label><input type="text" onChange={this.onAddingPeople}/>
              <button onClick={this.toAddPeople}>Add person</button>
              <label>Amount:</label><input type="text" onChange={this.onChangeAmount}/>  
              <label>Description:</label><input type="text" onChange={this.onChangeDescription}/>  
              <label>Payer:</label><input type="text" onChange={this.onChangePayer}/>  
              <label>Expense Title:</label><input type="text" onChange={this.onChangeExpenseTitle}/>
              <button onClick={this.addExpense}>Add</button>
            </div>
        )
    }
}
