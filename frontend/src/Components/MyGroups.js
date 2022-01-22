import React, { Component } from 'react'
import axios from 'axios'
import Expense from './CreateExpense'
class Group extends Component{    
    constructor(props){
        super(props);
        this.state={
            new_people:"",
            id:props.data._id,
            title:props.data.title,
            list_of_people:props.data.list_of_people,
            expenses:props.data.expenses
        }
        this.onNewPeopleAdd = this.onNewPeopleAdd.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onNewPeopleAdd(e){
        console.log(e.target.value)
        this.setState({new_people:e.target.value})
        console.log(this.state)
    }
    onSubmitForm(){
        axios.patch(`http://localhost:3001/groups/addpeople/${this.state.id}`,{new_people:[this.state.new_people]})
            .then(resp=>{
                console.log(resp.data)
            })
            .catch(err=>console.log(err))
    }
    render(){
        return (
            <div>
                <hr/>
                <h3>{this.state.title}</h3>
                <p>{this.state.list_of_people}</p>
                <p>{this.state.expenses}</p>
                <a href={`/groups?id=${this.state.id}`}>view group expenses</a>
                <input type="text" onChange={this.onNewPeopleAdd}/>
                <button onClick = {this.onSubmitForm}>Add People</button>
                <Expense id = {this.state.id}/>
            </div>
        )
    }
}

class GroupList extends Component{
    constructor(props){
        super(props);
        console.log("props:-",props)
        this.state = {
            phoneNo : props.data,
            mygroups:[],
            // show:false
        }
        this.getGroup = this.getGroup.bind(this);
    }
    getGroup(){
        axios.get('http://localhost:3001/users/mygroups',{params:{phoneNo:this.props.data}})
            .then(resp=>{
                console.log(resp.data)
                this.state.mygroups=resp.data;
                console.log(this.state)
            })
            .catch(err=>console.log(err))
    }
    componentDidMount(){
        console.log("state = ",this.state)
        this.getGroup()
    }
    render(){
        console.log(this.state.mygroups)
        this.state.mygroups.forEach(group=>{
            console.log(group)
        })
        return (
                <div class="groups">
                    <h1>Groups</h1>
                    {
                        this.state.mygroups.map((group)=>{
                            return (<Group key={group._id} data={group}/>)
                        })
                    }
                </div>
        )
    }
}


export default class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNo:"",
            mygroups:[],
            show:false
        }
        this.phoneNoChange = this.phoneNoChange.bind(this);
        // this.getGroup = this.getGroup.bind(this);
        this.show = this.show.bind(this);
        this.phoneNoChange= this.phoneNoChange.bind(this)
    }
    
    phoneNoChange(e){
        console.log(e.target.value)
        this.setState({phoneNo : e.target.value})
        console.log(this.state)
    }

    show(){
        this.setState({show:true})
    }

    render() {
        return (
                <div>
                    <h1>My Groups</h1>
                    <input type="text" onChange={this.phoneNoChange}/>
                    <button onClick={this.show}>Search</button>
                    <div class="groups">{
                        this.state.show &&
                            <GroupList data = {this.state.phoneNo}/>

                        }
                    </div>
                </div>
        )
    }
}
